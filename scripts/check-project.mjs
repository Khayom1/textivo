import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const read = (path) => readFileSync(path, "utf8");
const requiredFiles = ["index.html", "js/app.js", "css/style.css", "manifest.json", "sw.js"];
for (const path of requiredFiles) assert.ok(existsSync(path), `Missing required file: ${path}`);

const html = read("index.html");
const js = read("js/app.js");
const css = read("css/style.css");
const manifestText = read("manifest.json");
const sw = read("sw.js");
const manifest = JSON.parse(manifestText);

const allIds = [...html.matchAll(/\\bid=["']([^"']+)["']/g)].map((match) => match[1]);
const duplicates = allIds.filter((id, index) => allIds.indexOf(id) !== index);
assert.deepEqual(duplicates, [], "HTML must not contain duplicate IDs");

const htmlIds = new Set(allIds);
const dynamicIds = new Set(["portableHtmlBtn", "projectJsonBtn", "projectImportBtn", "projectImportFile"]);
const references = [...js.matchAll(/\\$\\(["']([^"']+)["']\\)/g)].map((match) => match[1]);
const missing = [...new Set(references)].filter((id) => !htmlIds.has(id) && !dynamicIds.has(id));
assert.deepEqual(missing, [], "Every static JavaScript element reference must exist in index.html");

assert.equal(manifest.short_name, "Textivo", "PWA short name must be Textivo");
assert.match(manifest.name, /Typography/i, "Manifest must describe the typography studio");
assert.equal(manifest.start_url, "./", "PWA start_url must stay relative");
assert.equal(manifest.scope, "./", "PWA scope must stay relative");
assert.equal(manifest.display, "standalone", "PWA must use standalone display");

assert.match(html, /href=["']manifest\\.json["']/, "HTML must link the web app manifest");
assert.match(html, /js\\/app\\.js\\?v=\\d+/, "HTML must load a versioned app script");
assert.match(html, /css\\/style\\.css\\?v=\\d+/, "HTML must load versioned styles");
assert.match(js, /Author: Khayom Abdurahmonov/, "Application source must identify its author");
assert.match(js, /function sanitizeEditorHTML/, "Project import must sanitize rich HTML");
assert.match(js, /lastRememberedHTML/, "Undo history must track the previous editor state");
assert.match(js, /content:\\s*\\{/, "Portable project export must use the content schema");
assert.match(js, /data\\.content\\.html/, "Portable project import must read the content schema");

const appVersion = js.match(/TEXTIVO_BUILD\\s*=\\s*["']v(\\d+)["']/)?.[1];
const cacheVersion = sw.match(/textivo-v(\\d+)/)?.[1];
const scriptVersion = html.match(/js\\/app\\.js\\?v=(\\d+)/)?.[1];
const styleVersion = html.match(/css\\/style\\.css\\?v=(\\d+)/)?.[1];
assert.ok(appVersion, "App build version must be declared");
assert.equal(cacheVersion, appVersion, "Service worker cache and app build versions must match");
assert.equal(scriptVersion, appVersion, "HTML script cache version must match app build");
assert.equal(styleVersion, appVersion, "HTML stylesheet cache version must match app build");

const cachedFiles = sw.match(/const FILES=\\[(.*?)\\];/s)?.[1];
assert.ok(cachedFiles, "Service worker must declare its offline app shell");
for (const match of cachedFiles.matchAll(/["']\\.\\/([^"'?]+)(?:\\?[^"']*)?["']/g)) {
  const path = match[1];
  assert.ok(existsSync(path), `Service worker caches a missing file: ${path}`);
}

assert.match(sw, /self\\.skipWaiting\\(\\)/, "Service worker must activate updated builds");
assert.match(sw, /self\\.clients\\.claim\\(\\)/, "Service worker must claim open clients");
assert.ok(css.length > 1000, "Stylesheet appears unexpectedly small");

console.log("Textivo project checks passed.");
console.log(`Checked ${references.length} DOM references, ${allIds.length} unique HTML IDs, PWA metadata, cache versions, and offline assets.`);
