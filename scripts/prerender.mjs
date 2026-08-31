import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const clientHtmlPath = fileURLToPath(
  new URL("../dist/client/index.html", import.meta.url),
);
const serverEntryUrl = new URL(
  "../dist/ssr/entry-server.js",
  import.meta.url,
);

const [{ render }, template] = await Promise.all([
  import(serverEntryUrl),
  readFile(clientHtmlPath, "utf8"),
]);

const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error("Unable to find the root marker in the client HTML.");
}

const html = template.replace(marker, `<div id="root">${render()}</div>`);
await writeFile(clientHtmlPath, html, "utf8");

console.log("Prerendered the report into dist/client/index.html");
