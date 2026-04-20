#!/usr/bin/env node
/**
 * Patches the /deploy page to add server-side password protection (Carolina).
 * Same logic as MD version, adapted paths for webstudio-carolina directory.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = path.resolve(__dirname, '..');
const ROUTES_DIR = path.join(PROJECT_DIR, 'app', 'routes');
const GENERATED_DIR = path.join(PROJECT_DIR, 'app', '__generated__');

const ROUTE_FILE = path.join(ROUTES_DIR, '[deploy]._index.tsx');
const GENERATED_FILE = path.join(GENERATED_DIR, '[deploy]._index.tsx');

const MARKER = '// [patch-deploy-auth]';

function patchRoute() {
  if (!fs.existsSync(ROUTE_FILE)) {
    console.log('  SKIP route (file not found)');
    return;
  }

  let content = fs.readFileSync(ROUTE_FILE, 'utf8');
  if (content.includes(MARKER)) {
    console.log('  SKIP route (already patched)');
    return;
  }

  content = content.replace(
    `} from "react-router";`,
    `} from "react-router";\nimport { createCookie } from "react-router"; ${MARKER}`
  );

  const authBlock = `
// Deploy page auth cookie (httpOnly, 24h expiry)
const deployAuthCookie = createCookie("deploy_auth", {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 86400,
  path: "/deploy",
});

const DEPLOY_PASSWORD = process.env.DEPLOY_PAGE_PASSWORD || process.env.DEPLOY_SECRET || "changeme";
`;

  content = content.replace(
    'const customFetch',
    authBlock + '\nconst customFetch'
  );

  const loaderReturnPattern = /return data\(\n\s+\{/;
  content = content.replace(
    loaderReturnPattern,
    `// Check deploy auth
  const cookieHeader = arg.request.headers.get("Cookie");
  const authValue = await deployAuthCookie.parse(cookieHeader);
  const isAuthenticated = authValue === "valid";

  return data(\n    {
      isAuthenticated,
      deploySecret: isAuthenticated ? (process.env.DEPLOY_SECRET || "") : "",`
  );

  const hasExistingAction = content.includes('export const action');

  if (hasExistingAction) {
    content = content.replace(
      /export const action = async \(\{/,
      'const _originalAction = async ({\n  // @ts-ignore - original Webstudio action\n'
    );

    const wrapperAction = `
export const action = async (args: ActionFunctionArgs) => {
  const formData = await args.request.clone().formData();
  const password = formData.get("password");
  const hasPasswordField = formData.has("password");

  if (hasPasswordField && password) {
    if (password === DEPLOY_PASSWORD) {
      return redirect("/deploy", {
        headers: {
          "Set-Cookie": await deployAuthCookie.serialize("valid"),
        },
      });
    }
    return data({ success: false, error: "Invalid password" }, { status: 401 });
  }

  return _originalAction(args);
};

`;

    content = content.replace(
      'export const loader',
      wrapperAction + 'export const loader'
    );
  } else {
    const actionBlock = `
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const password = formData.get("password");

  if (password === DEPLOY_PASSWORD) {
    return redirect("/deploy", {
      headers: {
        "Set-Cookie": await deployAuthCookie.serialize("valid"),
      },
    });
  }

  return data({ success: false, error: "Invalid password" }, { status: 401 });
};

`;

    content = content.replace(
      'export const loader',
      actionBlock + 'export const loader'
    );
  }

  fs.writeFileSync(ROUTE_FILE, content, 'utf8');
  console.log('  OK: patched route with auth');
}

function patchGenerated() {
  if (!fs.existsSync(GENERATED_FILE)) {
    console.log('  SKIP generated (file not found)');
    return;
  }

  let content = fs.readFileSync(GENERATED_FILE, 'utf8');
  if (content.includes(MARKER)) {
    console.log('  SKIP generated (already patched)');
    return;
  }

  content = content.replace(
    `import { Fragment, useState } from "react";`,
    `import { Fragment, useState } from "react";\nimport { useLoaderData, useActionData, Form } from "react-router"; ${MARKER}`
  );

  const pagePattern = /const Page = \(_props: \{ system: any; \}\) => \{[\s\S]*?return <Body/;

  content = content.replace(pagePattern, `const LoginForm = () => {
  const actionData = useActionData<{ success?: boolean; error?: string }>();
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#0f172a", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{
        background: "#1e293b", border: "1px solid #334155", borderRadius: "12px",
        padding: "40px", maxWidth: "400px", width: "100%", textAlign: "center"
      }}>
        <h1 style={{ color: "#f8fafc", fontSize: "1.5rem", marginBottom: "8px" }}>Deploy Access</h1>
        <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginBottom: "24px" }}>Enter password to continue</p>
        {actionData?.error && (
          <p style={{ color: "#f87171", fontSize: "0.875rem", marginBottom: "16px" }}>{actionData.error}</p>
        )}
        <Form method="post">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            style={{
              width: "100%", padding: "12px 16px", fontSize: "1rem", background: "#0f172a",
              border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0",
              marginBottom: "16px", outline: "none"
            }}
          />
          <button type="submit" style={{
            width: "100%", padding: "14px 28px", fontSize: "1rem", fontWeight: 600,
            color: "#fff", background: "#2563eb", border: "none", borderRadius: "8px", cursor: "pointer"
          }}>
            Sign In
          </button>
        </Form>
      </div>
    </div>
  );
};

const DeployPage = (_props: { system: any; }) => {
  const loaderData = useLoaderData<{ isAuthenticated: boolean; deploySecret: string }>();

  if (!loaderData?.isAuthenticated) {
    return <LoginForm />;
  }

  if (typeof window !== "undefined" && loaderData.deploySecret) {
    (window as any).__DEPLOY_SECRET__ = loaderData.deploySecret;
  }

return <Body`);

  content = content.replace(
    /const Page = DeployPage[\s\S]*?export \{ Page \}/,
    'export { Page }'
  );

  content = content.replace('export { Page }', 'const Page = DeployPage;\nexport { Page }');

  content = content.replace(
    /const DEPLOY_SECRET = '[^']*';/,
    "const DEPLOY_SECRET = window.__DEPLOY_SECRET__ || '';"
  );

  fs.writeFileSync(GENERATED_FILE, content, 'utf8');
  console.log('  OK: patched generated page with auth gate');
}

console.log('patch-deploy-page (Carolina):');
patchRoute();
patchGenerated();
console.log('patch-deploy-page: done');
