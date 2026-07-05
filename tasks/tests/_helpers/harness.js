/**
 * Shared test harness for the Project Sin real-world tasks.
 *
 * These helpers load the ACTUAL source files from `codebase/Project Sin` into a
 * jsdom window so that behavioural / regression tests exercise whatever the agent
 * produced on its experiment branch (rather than a hard-coded copy of the source).
 *
 * A jsdom window with `runScripts: 'dangerously'` is used so that:
 *   - top-level `function`/`var` declarations become window globals (browser semantics)
 *   - inline `onclick="..."` attribute handlers actually execute
 *   - uncaught exceptions surface on the virtual console as `jsdomError`
 */

const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const CODEBASE = path.join(__dirname, "..", "..", "..", "codebase", "Project Sin");
const JQUERY_PATH = path.join(CODEBASE, "dist", "js", "jquery-3.2.1.min.js");

function codebasePath(...parts) {
  return path.join(CODEBASE, ...parts);
}

function readCodebaseFile(relPath) {
  return fs.readFileSync(codebasePath(relPath), "utf8");
}

function codebaseFileExists(relPath) {
  return fs.existsSync(codebasePath(relPath));
}

/**
 * Absolute paths to every top-level *.html page in the codebase.
 * (Excludes the stray copy under img/janma so tests operate on the real site.)
 */
function listHtmlFiles() {
  return fs
    .readdirSync(CODEBASE)
    .filter((name) => name.toLowerCase().endsWith(".html"))
    .map((name) => codebasePath(name));
}

/**
 * Create a live jsdom window that executes scripts and records uncaught errors.
 *
 * @param {Object} opts
 * @param {string} [opts.html]  Full HTML document or body fragment.
 * @param {boolean} [opts.fragment=true]  If true, wrap `html` in a minimal document body.
 * @returns {{ dom, window, document, errors }} `errors` is a live array of captured errors.
 */
function createDom({ html = "", fragment = true } = {}) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (err) => errors.push(err));

  const documentHtml = fragment
    ? `<!DOCTYPE html><html><head></head><body>${html}</body></html>`
    : html;

  const dom = new JSDOM(documentHtml, {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole,
  });

  return { dom, window: dom.window, document: dom.window.document, errors };
}

/** Inject a block of JS as an executed <script> element (browser global semantics). */
function injectScript(window, code) {
  const script = window.document.createElement("script");
  script.textContent = code;
  window.document.body.appendChild(script);
}

/** Inject a source file from the codebase (path relative to `codebase/Project Sin`). */
function injectScriptFile(window, relPath) {
  injectScript(window, readCodebaseFile(relPath));
}

/** Load the real jQuery bundled with the site into the window. */
function loadJQuery(window) {
  injectScript(window, fs.readFileSync(JQUERY_PATH, "utf8"));
}

/**
 * Let queued macro/microtasks drain. jQuery attaches `$(fn)` ready callbacks via a
 * deferred that resolves over several setTimeout/microtask hops when the document is
 * already parsed, so we pump the loop a handful of times before asserting.
 */
async function flush(window, rounds = 6) {
  for (let i = 0; i < rounds; i++) {
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  }
}

/** True if any captured error looks like the given pattern (name or message). */
function hasError(errors, pattern) {
  const re = pattern instanceof RegExp ? pattern : new RegExp(pattern);
  return errors.some((err) => {
    const detail = err && err.detail;
    const parts = [
      err && err.message,
      detail && detail.name,
      detail && detail.message,
      detail && detail.stack,
    ].filter(Boolean);
    return parts.some((p) => re.test(String(p)));
  });
}

/** Parse an HTML file into a document WITHOUT executing its scripts (static inspection). */
function parseHtmlFile(absPath) {
  const html = fs.readFileSync(absPath, "utf8");
  const dom = new JSDOM(html, { runScripts: "outside-only" });
  return dom.window.document;
}

/**
 * Inject, in document order, every local `js/*.js` script referenced by a page. This
 * follows whatever `<script src>` tags the page currently declares, so a validation /
 * refactor file the agent adds and wires into the page is picked up automatically.
 * Scripts that throw at load (e.g. a carousel init with no matching DOM) are isolated
 * to their own <script> element, exactly like the browser.
 */
function injectPageScripts(window, pageRelPath) {
  const doc = parseHtmlFile(codebasePath(pageRelPath));
  const srcs = Array.from(doc.querySelectorAll("script[src]"))
    .map((s) => s.getAttribute("src") || "")
    .filter((src) => /(^|\/)js\//.test(src) || src.startsWith("js/"));
  for (const src of srcs) {
    const rel = src.replace(/^\.?\//, "");
    if (codebaseFileExists(rel)) injectScriptFile(window, rel);
  }
  return srcs;
}

/** Dispatch a real bubbling click on an element. */
function click(window, el) {
  el.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }));
}

/**
 * Suppress long-lived timers (e.g. the 4000ms auto-carousel loop in home.js) while
 * still letting short timers run — jQuery schedules its `$(fn)` ready callback via
 * setTimeout, so we must not stub it out entirely. Returns nothing.
 */
function suppressLongTimers(window, threshold = 1000) {
  const real = window.setTimeout.bind(window);
  window.setTimeout = (fn, delay, ...args) => {
    if (typeof delay === "number" && delay >= threshold) return 0;
    return real(fn, delay, ...args);
  };
}

module.exports = {
  CODEBASE,
  codebasePath,
  readCodebaseFile,
  codebaseFileExists,
  listHtmlFiles,
  createDom,
  injectScript,
  injectScriptFile,
  loadJQuery,
  flush,
  hasError,
  parseHtmlFile,
  injectPageScripts,
  click,
  suppressLongTimers,
};
