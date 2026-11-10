import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync("index.html", "utf8");
const js = readFileSync("js/app.js", "utf8");
const css = readFileSync("css/style.css", "utf8");
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const sw = readFileSync("sw.js", "utf8");

const idMatches = [...html.matchAll(/\bid=["']([^"']+)["']/g)];
const ids = new Set(idMatches.map(match => match[1]));
const duplicates = idMatches.map(match => match[1]).filter((id, i, all) => all.indexOf(id) !== i);
assert.deepEqual(duplicates, [], "HTML must not contain duplicate IDs");

const dynamicIds = new Set(["portableHtmlBtn", "projectJsonBtn", "projectImportBtn", "projectImportFile"]);
const references = [...js.matchAll(/\$\(["']([^"']+)["']\)/g)].map(match => match[1]);
const missing = [...new Set(references)].filter(id => !ids.has(id) && !dynamicIds.has(id));
assert.deepEqual(missing, [], "Every static JavaScript element reference must exist in index.html");

assert.equal(manifest.short_name, "Textivo", "PWA short name must be Textivo");
assert.match(manifest.name, /Typography/);
assert.ok(Array.isArray(manifest.icons) && manifest.icons.some(icon => icon.src === "assets/textivo-icon.svg"), "Manifest must declare the app icon");
assert.ok(html.includes('assets/textivo-icon.svg'), "HTML must declare the favicon");
assert.match(sw, /textivo-v14/, "Service worker cache must be versioned");
assert.match(sw, /assets\/textivo-icon\.svg/, "Service worker must cache the app icon");
assert.match(html, /style\.css\?v=14/);
assert.match(html, /app\.js\?v=14/);
assert.match(js, /TEXTIVO_BUILD = "v14"/);
assert.match(js, /Author: Khayom Abdurahmonov/, "Application source must identify its author");
assert.match(js, /function sanitizeEditorHTML/, "Project import must sanitize rich HTML");
assert.match(js, /lastRememberedHTML/, "Undo history must track the previous editor state");
assert.match(js, /textBlocks\.map\(text=>text\.outerHTML\)/, "SVG export must serialize positioned text nodes");
assert.match(js, /wordSpacing/, "Word spacing must be included in export logic");
assert.match(css, /prefers-reduced-motion/, "Reduced-motion preferences must be respected");

console.log("Textivo project checks passed.");
console.log(`Checked ${references.length} static DOM references, ${ids.size} HTML IDs, PWA assets, cache versions, and export safeguards.`);
