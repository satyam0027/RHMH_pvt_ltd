/**

 * Batch-fix common html-validate issues across static HTML pages.

 * Run: node scripts/fix-html-lint.js

 */

const fs = require("fs");

const path = require("path");



const root = path.join(__dirname, "..");



function walk(dir, files = []) {

  for (const name of fs.readdirSync(dir)) {

    const p = path.join(dir, name);

    const st = fs.statSync(p);

    if (st.isDirectory()) {

      if (name === "node_modules" || name === ".git") continue;

      walk(p, files);

    } else if (name.endsWith(".html")) {

      files.push(p);

    }

  }

  return files;

}



function encodeRawAmpersands(html) {

  return html.replace(/&(?!(?:amp|lt|gt|quot|#\d+|#x[\da-fA-F]+);)/g, "&amp;");

}



function fixFile(filePath) {

  let html = fs.readFileSync(filePath, "utf8");

  const original = html;

  if (html.charCodeAt(0) === 0xfeff) html = html.slice(1);



  const apply = (from, to) => {

    if (html.includes(from)) html = html.split(from).join(to);

  };



  apply("<!doctype html>", "<!DOCTYPE html>");

  apply('<span class="services-nav-item', '<div class="services-nav-item');

  apply(

    '</div></span><div class="services-nav-item industries-nav-item"',

    '</div></div><div class="services-nav-item industries-nav-item"'

  );

  apply("?'&amp;l='+", "?'&l='+");

  apply('<button class="menu-toggle"', '<button type="button" class="menu-toggle"');

  apply('<button class="accordion-header"', '<button type="button" class="accordion-header"');

  apply('<button class="filter-btn"', '<button type="button" class="filter-btn"');
  html = html.replace(/<p class="muted"\s+class="muted muted--spaced-top">/g, '<p class="muted muted--spaced-top">');

  apply('<nav class="nav-menu">', '<nav class="nav-menu" aria-label="Primary navigation">');

  apply('<nav class="mobile-menu">', '<nav class="mobile-menu" aria-label="Mobile navigation">');



  html = html.replace(/<ul class="hero-meta"\s+aria-label="[^"]*">/g, '<ul class="hero-meta">');

  html = html.replace(/ style="margin-top:16px;"/g, ' class="muted muted--spaced-top"');

  html = html.replace(/ class="muted" style="margin-top:16px;"/g, ' class="muted muted--spaced-top"');

  html = html.replace(/<div style="margin-bottom:10px;" aria-hidden="true">/g, '<div class="card__service-icon" aria-hidden="true">');



  html = encodeRawAmpersands(html);

  html = html

    .split("\n")

    .map((line) => line.replace(/[ \t]+$/u, ""))

    .join("\n");



  if (html !== original) {

    fs.writeFileSync(filePath, html, { encoding: "utf8" });

    return true;

  }

  return false;

}



const files = walk(root);

let count = 0;

for (const f of files) {

  if (fixFile(f)) {

    count += 1;

    console.log("fixed:", path.relative(root, f));

  }

}

console.log(`Done. Updated ${count} file(s).`);


