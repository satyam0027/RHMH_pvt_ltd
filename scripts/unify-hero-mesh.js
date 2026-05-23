const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const meshBg = `      <div class="hero-premium__bg" aria-hidden="true">
        <span class="hero-premium__mesh"></span>
        <span class="hero-premium__grid"></span>
        <span class="hero-premium__grain"></span>
        <span class="hero-premium__vignette"></span>
        <span class="hero-premium__beam"></span>
      </div>
`;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (name === "node_modules" || name === ".git" || name === "scripts") continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (name.endsWith(".html")) files.push(p);
  }
  return files;
}

let count = 0;
for (const file of walk(root)) {
  if (file.replace(/\\/g, "/").endsWith("/index.html") && path.basename(path.dirname(file)) === "") {
    // skip root index.html (home keeps video)
    const rel = path.relative(root, file);
    if (rel === "index.html") continue;
  }
  if (path.basename(file) === "index.html" && path.basename(path.dirname(file)) === path.basename(root)) continue;

  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("hero-premium__bg")) continue;

  html = html.replace(/hero-premium--[a-z]+/g, "hero-premium--mesh");
  html = html.replace(
    /<div class="hero-premium__bg" aria-hidden="true">[\s\S]*?<\/div>\n?/,
    meshBg
  );
  // Remove soft mesh modifier if present
  html = html.replace(/hero-premium__mesh hero-premium__mesh--soft/g, "hero-premium__mesh");

  fs.writeFileSync(file, html);
  count++;
  console.log("Mesh:", path.relative(root, file));
}
console.log(`Unified ${count} page(s) to about-style mesh hero.`);
