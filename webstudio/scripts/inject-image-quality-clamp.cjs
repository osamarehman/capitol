#!/usr/bin/env node
/**
 * inject-image-quality-clamp.cjs
 *
 * Post-build patch: clamp the IPX image-quality modifier to <=72 in the
 * /_image route loader. Webstudio emits srcset URLs at q_80 (its default,
 * which we couldn't change via the bundled lib). Rather than fight the
 * bundler, we clamp at the single point every image request flows through:
 * the IPX handler in app/routes/[_image].$.ts. A request for
 * /_image/w_750,q_80/... is rewritten to q_72 before IPX processes it, so
 * every variant is encoded at <=72 (PageSpeed "Improve image delivery").
 *
 * Idempotent: skips if the clamp (marker `__IPX_Q_CLAMP`) is already present.
 */

const fs = require("fs");
const path = require("path");

const ROUTE = path.join(__dirname, "..", "app", "routes", "[_image].$.ts");

const OLD = `export const loader = async (args: LoaderFunctionArgs) => {
  return handleRequest(args.request);
};`;

const NEW = `export const loader = async (args: LoaderFunctionArgs) => {
  // __IPX_Q_CLAMP: cap quality modifier at 72 (Webstudio emits q_80 default)
  const u = new URL(args.request.url);
  const p = u.pathname.replace(
    /(\\/_image\\/[^/]*?q_)(\\d+)/,
    (_m, pre, q) => pre + Math.min(parseInt(q, 10) || 72, 72)
  );
  const req =
    p === u.pathname
      ? args.request
      : new Request(u.origin + p + u.search, args.request);
  return handleRequest(req);
};`;

function log(msg) {
  console.log(`[image-quality-clamp] ${msg}`);
}

if (!fs.existsSync(ROUTE)) {
  log("WARN: _image route not found, skipping");
  process.exit(0);
}

let code = fs.readFileSync(ROUTE, "utf8");

if (code.includes("__IPX_Q_CLAMP")) {
  log("SKIP (already clamped)");
  process.exit(0);
}

if (!code.includes(OLD)) {
  log("WARN: expected loader body not found — skipped (route shape changed)");
  process.exit(0);
}

code = code.replace(OLD, NEW);
fs.writeFileSync(ROUTE, code);
log("OK (quality clamped to <=72)");
