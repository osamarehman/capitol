#!/usr/bin/env node
/**
 * Disables GA4/Facebook tracking on the /deploy page by wrapping the tracking
 * script in a pathname check. Tracking should not fire on the admin/deploy page.
 *
 * Patches the tracking IIFE in:
 *   - .webstudio/data.json (source of truth)
 *   - app/__generated__/_index.tsx (currently generated)
 */

const fs = require('fs');
const path = require('path');

const MARKER = 'TRACKING_DISABLED_DEPLOY';

let patched = 0;

// Patch data.json
const dataJsonPath = path.join(__dirname, '..', '.webstudio', 'data.json');
if (fs.existsSync(dataJsonPath)) {
  let raw = fs.readFileSync(dataJsonPath, 'utf8');
  if (!raw.includes(MARKER)) {
    // Wrap the entire tracking IIFE that starts with the helpers
    // Pattern: find the tracking script and prepend a guard
    const trackingStart = '// ========= DUAL TRACKING SCRIPT (Facebook Pixel + GA4) =========';
    if (raw.includes(trackingStart)) {
      const guard = '// ' + MARKER + '\\n' +
        'if (window.location.pathname.startsWith(\\"/deploy\\")) { console.log(\\"[deploy] tracking disabled\\"); } else { (function(){\\n' +
        trackingStart;
      raw = raw.replace(trackingStart, guard);

      // Find the last closing of the tracking script — it ends with the IIFE for FB browsing tracking
      // The script ends right before </script> in the wrapper
      // Look for the last meaningful line of the script before </script>
      // The tracking script ends with: ...internal_link_click fired...\n  });\n}\n\n"
      const lastEnd = "internal_link_click fired (clicked to: ' + href + ')');\\n  });\\n}\\n\\n";
      if (raw.includes(lastEnd)) {
        raw = raw.replace(lastEnd, lastEnd.replace('}\\n\\n', '}\\n})(); }\\n\\n'));
        fs.writeFileSync(dataJsonPath, raw);
        console.log('  ✓ data.json: tracking disabled on /deploy');
        patched++;
      } else {
        console.log('  ⚠ data.json: end marker not found');
      }
    } else {
      console.log('  ⚠ data.json: tracking start not found');
    }
  } else {
    console.log('  data.json: already patched');
  }
}

// Patch generated _index.tsx
const indexPath = path.join(__dirname, '..', 'app', '__generated__', '_index.tsx');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  if (!content.includes(MARKER)) {
    // The tracking script in TSX uses \\n escapes
    const trackingStart = '// ========= DUAL TRACKING SCRIPT (Facebook Pixel + GA4) =========';
    if (content.includes(trackingStart)) {
      const guard = '// ' + MARKER + '\\n' +
        'if (window.location.pathname.startsWith(\\"/deploy\\")) { console.log(\\"[deploy] tracking disabled\\"); } else { (function(){\\n' +
        trackingStart;
      content = content.replace(trackingStart, guard);

      const lastEnd = "internal_link_click fired (clicked to: ' + href + ')');\\n  });\\n}\\n\\n";
      if (content.includes(lastEnd)) {
        content = content.replace(lastEnd, lastEnd.replace('}\\n\\n', '}\\n})(); }\\n\\n'));
        fs.writeFileSync(indexPath, content);
        console.log('  ✓ _index.tsx: tracking disabled on /deploy');
        patched++;
      } else {
        console.log('  ⚠ _index.tsx: end marker not found');
      }
    } else {
      console.log('  ⚠ _index.tsx: tracking start not found');
    }
  } else {
    console.log('  _index.tsx: already patched');
  }
}

console.log(`Done: ${patched} file(s) patched`);
