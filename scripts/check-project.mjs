import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync("index.html", "utf8");
const js = readFileSync("js/app.js", "utf8");
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const sw = readFileSync("sw.js", "utf8");

const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]));
const duplicates = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]).filter((id, i, all) => all.indexOf(id) !== i);
assert.deepEqual(duplicates, [], "HTML must not contain duplicate IDs");

const dynamicIds = new Set(["portableHtmlBtn", "projectJsonBtn", "projectImportBtn", "projectImportFile"]);
const references = [...js.matchAll(/\$\(["']([^"']+)["']\)/g)].map(match => match[1]);
const missing = [...new Set(references)].filter(id => !ids.has(id) && !dynamicIds.has(id));
assert.deepEqual(missing, [], "Every static JavaScript element reference must exist in index.html");

assert.equal(manifest.short_name, "Textivo", "PWA short name must be Textivo");
assert.match(manifest.name, /Typography/);
assert.match(sw, /textivo-v13/, "Service worker cache must be versioned");
assert.match(js, /Author: Khayom Abdurahmonov/, "Application source must identify its author");
assert.match(js, /function sanitizeEditorHTML/, "Project import must sanitize rich HTML");
assert.match(js, /lastRememberedHTML/, "Undo history must track the previous editor state");

console.log("Textivo project checks passed.");
console.log(`Checked ${references.length} static DOM references and ${ids.size} HTML IDs.`);
