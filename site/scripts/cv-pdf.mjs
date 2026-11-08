// Prints the built /cv page to dist/matthew-port-cv.pdf with headless Chrome. Run after `astro build`.
// Any failure exits non-zero, so a deploy can't go out with a missing or stale PDF.
import { execFile, spawnSync } from "node:child_process";
import { once } from "node:events";
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const SITE = "https://mattport.com";
const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const output = join(dist, "matthew-port-cv.pdf");
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function findBrowser() {
  const candidates = [process.env.CHROME_BIN, "chromium-browser", "chromium", "google-chrome"];
  const browser = candidates.find((c) => c && spawnSync(c, ["--version"]).status === 0);
  if (!browser) throw new Error("No Chrome or Chromium found. Set CHROME_BIN.");
  return browser;
}

// The page's links are made absolute, or the PDF's links would point at this temporary server.
// Assets stay as they are so they load from it.
const cvPage = readFileSync(join(dist, "cv", "index.html"), "utf8").replace(
  /(<a\b[^>]*\bhref=")\/(?!\/)/g,
  `$1${SITE}/`,
);

const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, SITE).pathname));
  if (path === "/cv/") {
    res.writeHead(200, { "Content-Type": types[".html"] }).end(cvPage);
    return;
  }
  const file = join(dist, path);
  if (!existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
});

const profile = mkdtempSync(join(tmpdir(), "cv-pdf-"));

try {
  rmSync(output, { force: true });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");

  // Asynchronous, because this process also has to answer Chrome's requests.
  await promisify(execFile)(
    findBrowser(),
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      `--user-data-dir=${profile}`,
      "--no-pdf-header-footer",
      "--virtual-time-budget=5000", // Lets the web fonts load before printing.
      `--print-to-pdf=${output}`,
      `http://127.0.0.1:${server.address().port}/cv/`,
    ],
    { timeout: 60_000 },
  );
  if (!existsSync(output) || readFileSync(output).subarray(0, 4).toString() !== "%PDF") {
    throw new Error("Chrome did not write a valid PDF");
  }
  console.log(`Wrote ${output}`);
} finally {
  server.close();
  server.closeAllConnections();
  rmSync(profile, { recursive: true, force: true });
}
