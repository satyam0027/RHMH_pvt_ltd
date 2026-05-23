const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const variantBg = {
  mesh: `      <div class="hero-premium__bg" aria-hidden="true">
        <span class="hero-premium__mesh"></span>
        <span class="hero-premium__grid"></span>
        <span class="hero-premium__grain"></span>
        <span class="hero-premium__vignette"></span>
        <span class="hero-premium__beam"></span>
      </div>
`,
  aurora: `      <div class="hero-premium__bg" aria-hidden="true">
        <span class="hero-premium__aurora"></span>
        <span class="hero-premium__grain"></span>
        <span class="hero-premium__vignette"></span>
        <span class="hero-premium__beam"></span>
      </div>
`,
  dots: `      <div class="hero-premium__bg" aria-hidden="true">
        <span class="hero-premium__mesh"></span>
        <span class="hero-premium__dots"></span>
        <span class="hero-premium__grain"></span>
        <span class="hero-premium__vignette"></span>
        <span class="hero-premium__beam"></span>
      </div>
`,
  lines: `      <div class="hero-premium__bg" aria-hidden="true">
        <span class="hero-premium__mesh"></span>
        <span class="hero-premium__lines"></span>
        <span class="hero-premium__grain"></span>
        <span class="hero-premium__vignette"></span>
        <span class="hero-premium__beam"></span>
      </div>
`,
  scan: `      <div class="hero-premium__bg" aria-hidden="true">
        <span class="hero-premium__mesh"></span>
        <span class="hero-premium__scan"></span>
        <span class="hero-premium__grain"></span>
        <span class="hero-premium__vignette"></span>
      </div>
`,
  minimal: `      <div class="hero-premium__bg" aria-hidden="true">
        <span class="hero-premium__mesh hero-premium__mesh--soft"></span>
        <span class="hero-premium__grain"></span>
        <span class="hero-premium__vignette"></span>
      </div>
`,
};

const slugVariant = {
  about: "mesh",
  services: "aurora",
  seo: "mesh",
  smm: "dots",
  web: "lines",
  ppc: "scan",
  performance: "mesh",
  video: "scan",
  realestate: "aurora",
  healthcare: "dots",
  fmcg: "mesh",
  textile: "lines",
  education: "aurora",
  manufacturing: "dots",
  legal: "minimal",
};

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (name === "node_modules" || name === ".git") continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (name === "index.html") files.push(p);
  }
  return files;
}

const heroRe =
  /<section class="section hero hero-inner hero-inner--([a-z]+)([^"]*)">/g;

let updated = 0;
for (const file of walk(root)) {
  if (file.includes(`${path.sep}scripts${path.sep}`)) continue;
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("hero-inner")) continue;

  const m = heroRe.exec(html);
  heroRe.lastIndex = 0;
  if (!m) continue;

  const slug = m[1];
  const variant = slugVariant[slug];
  if (!variant) {
    console.warn("No variant for slug:", slug, file);
    continue;
  }

  if (html.includes("hero-premium__bg")) {
    if (!html.includes(`hero-premium--${variant}`)) {
      html = html.replace(
        /(<section class="section hero hero-inner hero-inner--[a-z]+)([^"]*)(">)/,
        (_, a, rest, end) => {
          let classes = rest;
          if (!classes.includes("hero-premium")) classes += " hero-premium";
          classes = classes.replace(/\s*hero-premium--[a-z]+\s*/g, " ");
          return `${a}${classes} hero-premium--${variant}${end}`;
        }
      );
      fs.writeFileSync(file, html);
      console.log("Variant only:", path.relative(root, file));
    }
    continue;
  }

  html = html.replace(
    /<section class="section hero hero-inner hero-inner--([a-z]+)([^"]*)">/,
    (_, s, rest) => {
      let extra = rest;
      if (!extra.includes("hero-premium")) extra += " hero-premium";
      extra = extra.replace(/\s*hero-premium--[a-z]+\s*/g, " ");
      return `<section class="section hero hero-inner hero-inner--${s}${extra} hero-premium--${variant}">`;
    }
  );

  html = html.replace(
    /(<section class="section hero hero-inner hero-inner--[a-z]+[^"]*">)\s*/,
    `$1\n${variantBg[variant]}`
  );

  fs.writeFileSync(file, html);
  updated++;
  console.log("Updated:", path.relative(root, file), `(${slug} → ${variant})`);
}

console.log(`Done. ${updated} file(s) updated.`);
