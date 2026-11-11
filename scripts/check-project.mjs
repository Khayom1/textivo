import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync("index.html", "utf8");
const js = readFileSync("js/app.js", "utf8");
const css = readFileSync("css/style.css", "utf8");
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const sw = readFileSync("sw.js", "utf8");
const guide = readFileSync("GUIDE.md", "utf8");
const readme = readFileSync("README.md", "utf8");

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
assert.match(sw, /textivo-v16/, "Service worker cache must use the current version");
assert.match(sw, /assets\/textivo-icon\.svg/, "Service worker must cache the app icon");
assert.match(js, /Author: Khayom Abdurahmonov/, "Application source must identify its author");
assert.match(js, /GitHub: https:\/\/github\.com\/Khayom1/, "Application source must link the author GitHub account");
for (const id of ["textStats","findText","replaceText","replaceNextBtn","replaceAllBtn","upperBtn","lowerBtn","titleCaseBtn","trimSpacesBtn","removeBlankBtn","dedupeLinesBtn","sortLinesBtn"]) assert.ok(ids.has(id), `Text Studio tool is missing: ${id}`);
assert.match(js, /function updateTextStats/, "Live text statistics must be available");
assert.match(js, /function replaceText/, "Find and replace tools must be available");
assert.ok(js.includes("Object.assign(dict.ru"), "Russian UI translations must be available");
assert.ok(js.includes("Object.assign(dict.tg"), "Tajik UI translations must be available");
assert.ok(readme.includes("GUIDE.md"), "README must link the full user guide");
assert.match(guide, /Complete User Guide/);
assert.match(guide, /GitHub @Khayom1/);
assert.ok(guide.length > 10000, "The complete user guide must contain meaningful documentation");
assert.match(js, /pendingWhitespace/, "Motion Studio must preserve leading whitespace with the first word");
assert.match(js, /pending=\[\]/, "Portable export must preserve leading whitespace with the first word");
assert.match(js, /function sanitizeEditorHTML/, "Project import must sanitize rich HTML");
assert.match(js, /lastRememberedHTML/, "Undo history must track the previous editor state");
assert.match(js, /textBlocks\.map\(text=>text\.outerHTML\)/, "SVG export must serialize positioned text nodes");
assert.match(js, /wordSpacing/, "Word spacing must be included in export logic");
assert.match(js, /blurFilters\.push/, "SVG blur must use a real Gaussian blur filter");
assert.doesNotMatch(js, /const\s+const/, "JavaScript must not contain duplicated const declarations");
assert.match(css, /prefers-reduced-motion/, "Reduced-motion preferences must be respected");

const cacheVersion = sw.match(/textivo-v(\d+)/)?.[1];
const scriptVersion = html.match(/js\/app\.js\?v=(\d+)/)?.[1];
const styleVersion = html.match(/css\/style\.css\?v=(\d+)/)?.[1];
assert.ok(appVersion, "App build version must be declared");
assert.equal(cacheVersion, appVersion, "Service worker cache version must match app build");
assert.equal(scriptVersion, appVersion, "HTML app script version must match app build");
assert.equal(styleVersion, appVersion, "HTML stylesheet version must match app build");
assert.ok(existsSync("assets/textivo-icon.svg"), "PWA icon file must exist");
assert.ok(existsSync("GUIDE.md"), "Complete user guide must exist");

const precache = sw.match(/const FILES=\[(.*?)\];/s)?.[1] || "";
assert.ok(precache.includes(`style.css?v=${appVersion}`), "Offline cache must include the current stylesheet");
assert.ok(precache.includes(`app.js?v=${appVersion}`), "Offline cache must include the current app script");
for (const match of precache.matchAll(/["']\.\/([^"'?]+)(?:\?[^"']*)?["']/g)) {
  assert.ok(existsSync(match[1]), `Offline cache references a missing file: ${match[1]}`);
}


console.log("Textivo project checks passed.");
console.log(`Checked ${references.length} static DOM references, ${ids.size} HTML IDs, PWA assets, cache versions, and export safeguards.`);
