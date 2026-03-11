#!/usr/bin/env node
/**
 * Patches the /deploy page to add server-side password protection.
 * Run after `webstudio build` and before Docker build.
 *
 * - Adds cookie-based auth check to the route loader
 * - Adds login form action handler
 * - Wraps the page component in an auth gate
 * - Deploy secret is only sent to authenticated clients
 *
 * Password is set via DEPLOY_PAGE_PASSWORD env var (defaults to DEPLOY_SECRET).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const ROUTES_DIR = path.join(ROOT, 'webstudio/app/routes');
const GENERATED_DIR = path.join(ROOT, 'webstudio/app/__generated__');

const ROUTE_FILE = path.join(ROUTES_DIR, '[deploy]._index.tsx');
const GENERATED_FILE = path.join(GENERATED_DIR, '[deploy]._index.tsx');

const MARKER = '// [patch-deploy-auth]';

// --- Patch 1: Route file (loader + action for auth) ---
function patchRoute() {
  let content = fs.readFileSync(ROUTE_FILE, 'utf8');
  if (content.includes(MARKER)) {
    console.log('  SKIP route (already patched)');
    return;
  }

  // Add cookie import at the top of the file
  content = content.replace(
    `} from "react-router";`,
    `} from "react-router";\nimport { createCookie } from "react-router"; ${MARKER}`
  );

  // Add cookie + auth logic after imports, before customFetch
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

  // Patch the loader to check auth cookie
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

  // Replace the existing Webstudio action with our auth-aware version
  // The original action handles form submissions; we wrap it to also handle login
  const hasExistingAction = content.includes('export const action');

  if (hasExistingAction) {
    // Rename existing action to _originalAction
    content = content.replace(
      /export const action = async \(\{/,
      'const _originalAction = async ({\n  // @ts-ignore - original Webstudio action\n'
    );

    // Insert our wrapper action that checks for login first, then delegates
    const wrapperAction = `
export const action = async (args: ActionFunctionArgs) => {
  const formData = await args.request.clone().formData();
  const password = formData.get("password");
  const hasPasswordField = formData.has("password");

  // Handle deploy auth login
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

  // Delegate to original Webstudio action for form submissions
  return _originalAction(args);
};

`;

    content = content.replace(
      'export const loader',
      wrapperAction + 'export const loader'
    );
  } else {
    // No existing action - add our standalone auth action
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

// --- Patch 2: Generated file (wrap Page in auth gate) ---
function patchGenerated() {
  let content = fs.readFileSync(GENERATED_FILE, 'utf8');
  if (content.includes(MARKER)) {
    console.log('  SKIP generated (already patched)');
    return;
  }

  // Add useLoaderData and useActionData imports
  content = content.replace(
    `import { Fragment, useState } from "react";`,
    `import { Fragment, useState } from "react";\nimport { useLoaderData, useActionData, Form } from "react-router"; ${MARKER}`
  );

  // Replace the Page component with an auth-gated version
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

  // Inject the deploy secret from server into the page
  if (typeof window !== "undefined" && loaderData.deploySecret) {
    (window as any).__DEPLOY_SECRET__ = loaderData.deploySecret;
  }

return <Body`);

  // Rename the Page export to use our wrapper
  content = content.replace(
    /const Page = DeployPage[\s\S]*?export \{ Page \}/,
    'export { Page }'
  );

  // Fix: rename the inner component and export the wrapper as Page
  content = content.replace('export { Page }', 'const Page = DeployPage;\nexport { Page }');

  // Replace hardcoded DEPLOY_SECRET in the embedded script
  content = content.replace(
    /const DEPLOY_SECRET = '[^']*';/,
    "const DEPLOY_SECRET = window.__DEPLOY_SECRET__ || '';"
  );

  fs.writeFileSync(GENERATED_FILE, content, 'utf8');
  console.log('  OK: patched generated page with auth gate');
}

// Run patches
console.log('patch-deploy-page:');
patchRoute();
patchGenerated();
console.log('patch-deploy-page: done');
