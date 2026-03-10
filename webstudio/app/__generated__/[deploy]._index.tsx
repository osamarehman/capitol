/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
import { useLoaderData, useActionData, Form } from "react-router"; // [patch-deploy-auth]
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body } from "@webstudio-is/sdk-components-react-router";
import { HtmlEmbed as HtmlEmbed } from "@webstudio-is/sdk-components-react";


      export const projectId = "5b897bfc-8b80-4b2a-bfed-79ac7ec37365";

      export const lastPublished = "2026-03-10T15:02:01.614Z";

      export const siteName = "Capitol Improvements";

      export const breakpoints = [{"id":"cAXOgWVeuCB3jDJaSpTIC"},{"id":"ENSxxr83hFXkB2uOvItht","maxWidth":991},{"id":"jRbIM0w-_5xst6S9c2XLZ","maxWidth":767},{"id":"86r6F2Lba-5RnsxO3lS8a","maxWidth":479}];

      export const favIconAsset: string | undefined =
        "64c9668b95320504f7298d3a_logo-fav_K_8rs1tKqjZ0oNR3Mm-J8.png";

      // Font assets on current page (can be preloaded)
      export const pageFontAssets: string[] =
        []

      export const pageBackgroundImageAssets: string[] =
        []

      

      const LoginForm = () => {
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

return <Body
className={`w-element`}>
<HtmlEmbed
code={" <style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n\n    body {\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n      background: #0f172a;\n      color: #e2e8f0;\n      min-height: 100vh;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .deploy-card {\n      background: #1e293b;\n      border: 1px solid #334155;\n      border-radius: 12px;\n      padding: 40px;\n      max-width: 480px;\n      width: 100%;\n      text-align: center;\n    }\n\n    h1 {\n      font-size: 1.5rem;\n      margin-bottom: 8px;\n      color: #f8fafc;\n    }\n\n    .subtitle {\n      color: #94a3b8;\n      font-size: 0.875rem;\n      margin-bottom: 32px;\n    }\n\n    .status-badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      padding: 8px 16px;\n      border-radius: 20px;\n      font-size: 0.8rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n      margin-bottom: 24px;\n    }\n\n    .status-badge .dot {\n      width: 8px;\n      height: 8px;\n      border-radius: 50%;\n    }\n\n    .status-idle { background: #1e3a5f; color: #7dd3fc; }\n    .status-idle .dot { background: #7dd3fc; }\n\n    .status-running { background: #422006; color: #fbbf24; }\n    .status-running .dot { background: #fbbf24; animation: pulse 1s infinite; }\n\n    .status-success { background: #14532d; color: #4ade80; }\n    .status-success .dot { background: #4ade80; }\n\n    .status-failed { background: #450a0a; color: #f87171; }\n    .status-failed .dot { background: #f87171; }\n\n    @keyframes pulse {\n      0%, 100% { opacity: 1; }\n      50% { opacity: 0.3; }\n    }\n\n    .deploy-btn {\n      width: 100%;\n      padding: 14px 28px;\n      font-size: 1rem;\n      font-weight: 600;\n      color: #fff;\n      background: #2563eb;\n      border: none;\n      border-radius: 8px;\n      cursor: pointer;\n      transition: background 0.2s, transform 0.1s;\n    }\n\n    .deploy-btn:hover:not(:disabled) {\n      background: #1d4ed8;\n      transform: translateY(-1px);\n    }\n\n    .deploy-btn:active:not(:disabled) {\n      transform: translateY(0);\n    }\n\n    .deploy-btn:disabled {\n      background: #475569;\n      cursor: not-allowed;\n      opacity: 0.7;\n    }\n\n    .info {\n      margin-top: 20px;\n      font-size: 0.8rem;\n      color: #64748b;\n    }\n\n    .info .time {\n      color: #94a3b8;\n    }\n\n    .step-indicator {\n      display: flex;\n      justify-content: center;\n      gap: 6px;\n      margin-bottom: 20px;\n      flex-wrap: wrap;\n    }\n\n    .step-pip {\n      padding: 4px 10px;\n      border-radius: 12px;\n      font-size: 0.65rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      background: #334155;\n      color: #64748b;\n      transition: all 0.3s;\n    }\n\n    .step-pip.active {\n      background: #422006;\n      color: #fbbf24;\n      animation: pulse 1s infinite;\n    }\n\n    .step-pip.done {\n      background: #14532d;\n      color: #4ade80;\n    }\n\n    .log-area {\n      margin-top: 20px;\n      text-align: left;\n      background: #0f172a;\n      border: 1px solid #334155;\n      border-radius: 8px;\n      padding: 12px;\n      font-family: 'SF Mono', 'Fira Code', monospace;\n      font-size: 0.7rem;\n      line-height: 1.5;\n      color: #94a3b8;\n      max-height: 300px;\n      overflow-y: auto;\n      display: none;\n      white-space: pre-wrap;\n      word-break: break-all;\n    }\n\n    .log-area.visible { display: block; }\n\n    .log-area .log-step { color: #38bdf8; font-weight: 600; }\n    .log-area .log-error { color: #f87171; }\n    .log-area .log-success { color: #4ade80; }\n  </style>"}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"  <div class=\"deploy-card\">\n    <h1>Webstudio Deploy</h1>\n    <p class=\"subtitle\">v2.improveitmd.com</p>\n\n    <div id=\"status\" class=\"status-badge status-idle\">\n      <span class=\"dot\"></span>\n      <span id=\"status-text\">Idle</span>\n    </div>\n\n    <div id=\"steps\" class=\"step-indicator\" style=\"display:none;\">\n      <span class=\"step-pip\" data-step=\"sync\">Sync</span>\n      <span class=\"step-pip\" data-step=\"build_assets\">Assets</span>\n      <span class=\"step-pip\" data-step=\"post_sync\">Patch</span>\n      <span class=\"step-pip\" data-step=\"docker_build\">Build</span>\n      <span class=\"step-pip\" data-step=\"deploy\">Deploy</span>\n      <span class=\"step-pip\" data-step=\"health_check\">Health</span>\n    </div>\n\n    <button id=\"deploy-btn\" class=\"deploy-btn\" onclick=\"triggerDeploy()\">\n      Deploy Now\n    </button>\n\n    <div id=\"log\" class=\"log-area\"></div>\n\n    <div class=\"info\" id=\"info\"></div>\n  </div>\n\n  <script>\n    // ---- CONFIGURATION ----\n    const DEPLOY_URL = 'https://v2.improveitmd.com';\n    const DEPLOY_SECRET = window.__DEPLOY_SECRET__ || '';\n    // -----------------------\n\n    const btn = document.getElementById('deploy-btn');\n    const statusEl = document.getElementById('status');\n    const statusText = document.getElementById('status-text');\n    const logArea = document.getElementById('log');\n    const info = document.getElementById('info');\n    const stepsEl = document.getElementById('steps');\n\n    let pollInterval = null;\n    let logOffset = 0;\n\n    const STEP_ORDER = ['sync', 'build_assets', 'post_sync', 'docker_build', 'deploy', 'health_check', 'done'];\n\n    function setStatus(state, text) {\n      statusEl.className = 'status-badge status-' + state;\n      statusText.textContent = text;\n    }\n\n    function updateSteps(currentStep) {\n      if (!currentStep || currentStep === 'starting') return;\n      stepsEl.style.display = 'flex';\n      const currentIdx = STEP_ORDER.indexOf(currentStep);\n      stepsEl.querySelectorAll('.step-pip').forEach(pip => {\n        const stepIdx = STEP_ORDER.indexOf(pip.dataset.step);\n        pip.classList.remove('active', 'done');\n        if (stepIdx < currentIdx || currentStep === 'done') {\n          pip.classList.add('done');\n        } else if (stepIdx === currentIdx) {\n          pip.classList.add('active');\n        }\n      });\n    }\n\n    function appendLogs(lines) {\n      if (!lines.length) return;\n      logArea.classList.add('visible');\n      lines.forEach(line => {\n        const span = document.createElement('div');\n        if (line.includes('===') || line.includes('Starting') || line.includes('Syncing') ||\n            line.includes('Building') || line.includes('Running') || line.includes('Deploying') ||\n            line.includes('Waiting')) {\n          span.className = 'log-step';\n        } else if (line.includes('ERROR') || line.includes('failed') || line.includes('WARN')) {\n          span.className = 'log-error';\n        } else if (line.includes('successful') || line.includes('complete') || line.includes('Live')) {\n          span.className = 'log-success';\n        }\n        span.textContent = line;\n        logArea.appendChild(span);\n      });\n      logArea.scrollTop = logArea.scrollHeight;\n    }\n\n    async function triggerDeploy() {\n      btn.disabled = true;\n      btn.textContent = 'Deploying...';\n      logArea.innerHTML = '';\n      logOffset = 0;\n      setStatus('running', 'Triggering...');\n      stepsEl.style.display = 'none';\n      stepsEl.querySelectorAll('.step-pip').forEach(p => p.classList.remove('active', 'done'));\n\n      try {\n        const res = await fetch(DEPLOY_URL + '/deploy/trigger', {\n          method: 'POST',\n          headers: {\n            'Content-Type': 'application/json',\n            'Authorization': 'Bearer ' + DEPLOY_SECRET,\n          },\n          body: JSON.stringify({ trigger: 'manual', timestamp: new Date().toISOString() }),\n        });\n\n        const data = await res.json();\n\n        if (res.status === 202 || res.status === 409) {\n          setStatus('running', 'Running');\n          startPolling();\n        } else {\n          appendLogs(['Error: ' + (data.error || res.statusText)]);\n          setStatus('failed', 'Trigger Failed');\n          btn.disabled = false;\n          btn.textContent = 'Retry Deploy';\n        }\n      } catch (err) {\n        appendLogs(['Network error: ' + err.message]);\n        setStatus('failed', 'Connection Error');\n        btn.disabled = false;\n        btn.textContent = 'Retry Deploy';\n      }\n    }\n\n    function startPolling() {\n      if (pollInterval) clearInterval(pollInterval);\n      pollInterval = setInterval(checkStatus, 2000);\n    }\n\n    async function checkStatus() {\n      try {\n        const res = await fetch(DEPLOY_URL + '/deploy/status?since=' + logOffset);\n        const data = await res.json();\n\n        // Append new log lines\n        if (data.logs && data.logs.length > 0) {\n          appendLogs(data.logs);\n          logOffset = data.log_offset;\n        }\n\n        // Update step indicators\n        if (data.step) updateSteps(data.step);\n\n        if (data.status === 'running') {\n          setStatus('running', data.step ? data.step.replace('_', ' ') : 'Deploying');\n        } else if (data.status === 'success') {\n          setStatus('success', 'Live');\n          updateSteps('done');\n          info.innerHTML = 'Last deploy: <span class=\"time\">' + data.finished_at + '</span>';\n          btn.disabled = false;\n          btn.textContent = 'Deploy Again';\n          clearInterval(pollInterval);\n        } else if (data.status === 'failed') {\n          setStatus('failed', 'Failed');\n          info.innerHTML = 'Failed at: <span class=\"time\">' + data.finished_at + '</span>';\n          btn.disabled = false;\n          btn.textContent = 'Retry Deploy';\n          clearInterval(pollInterval);\n        }\n      } catch (err) {\n        // Silently retry on poll errors\n      }\n    }\n\n    // Check initial status on load\n    checkStatus();\n  </script>"}
clientOnly={true}
className={`w-html-embed`} />
</Body>
}


      const Page = DeployPage;
export { Page }
    