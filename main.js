document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  // Top contact bar (email / phone / WhatsApp) injected site-wide.
  if (header && header.dataset.topbar !== "true") {
    const topbar = document.createElement("div");
    topbar.className = "topbar";
    topbar.innerHTML = `
      <div class="container topbar-inner">
        <div class="topbar-left">
          <a class="topbar-link" href="mailto:info@redhotmediahouse.com" aria-label="Email Red Hot Media House">
            <span class="topbar-ico" aria-hidden="true">✉</span>
            <span>info@redhotmediahouse.com</span>
          </a>
          <a class="topbar-link" href="tel:+919582732323" aria-label="Call Red Hot Media House">
            <span class="topbar-ico" aria-hidden="true">☎</span>
            <span>+91 95827 32323</span>
          </a>
        </div>
        <div class="topbar-right">
          <a class="topbar-link topbar-link--whatsapp" href="https://wa.me/919582732323" aria-label="Chat on WhatsApp">
            <span class="topbar-ico" aria-hidden="true"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block"><defs><linearGradient id="waGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#25d366"/><stop offset="100%" stop-color="#128c7e"/></linearGradient></defs><path d="M20.5 3.4A10.4 10.4 0 0 0 3.6 16.1L2 22l6-1.6A10.4 10.4 0 1 0 20.5 3.4zm-8.4 16a8.6 8.6 0 0 1-4.4-1.2l-.3-.2-3.6 1 1-3.5-.2-.3a8.6 8.6 0 1 1 7.5 4.2zm4.7-6.5c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.1-.5 0a7 7 0 0 1-2.1-1.3 7.7 7.7 0 0 1-1.4-1.8c-.2-.3 0-.4.1-.5l.4-.4.2-.4c.1-.1 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4 5.4 5.4 0 0 0 3 .7c.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2-.3-.2-.6-.3z" fill="url(#waGrad)"/></svg></span>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    `;
    header.prepend(topbar);
    header.dataset.topbar = "true";
  }

  // Inject chevron arrows next to top-level nav links that have dropdowns.
  document.querySelectorAll(".services-nav-item, .industries-nav-item").forEach((wrap) => {
    const link = wrap.querySelector(":scope > a[data-nav]");
    if (!link || link.dataset.chevron === "true") return;
    const chev = document.createElement("span");
    chev.className = "nav-chevron";
    chev.setAttribute("aria-hidden", "true");
    chev.innerHTML = '<svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    link.appendChild(chev);
    link.dataset.chevron = "true";
  });

  // Enrich the footer with newsletter, social icons, and legal/policy links
  // (runs once per page load on every page that uses .site-footer).
  const footer = document.querySelector(".site-footer");
  if (footer && footer.dataset.enriched !== "true") {
    const grid = footer.querySelector(".footer-grid");
    if (grid) {
      const top = document.createElement("div");
      top.className = "footer-top";
      top.innerHTML = `
        <div class="footer-newsletter">
          <span class="footer-eyebrow">Newsletter</span>
          <h3>Stay ahead of the curve</h3>
          <p>Get growth playbooks, case studies & performance marketing insights — delivered straight to your inbox.</p>
          <form class="footer-newsletter-form" action="https://formsubmit.co/info@redhotmediahouse.com" method="POST" data-form="Newsletter Subscription" novalidate>
            <label for="footer-newsletter-email" class="visually-hidden">Email address</label>
            <input id="footer-newsletter-email" type="email" name="newsletter-email" placeholder="Enter your work email" required>
            <input type="hidden" name="_subject" value="New Newsletter Subscriber — Red Hot Media House">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_source" value="Site footer — newsletter signup">
            <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-10000px;width:1px;height:1px;opacity:0;pointer-events:none;">
            <button type="submit" aria-label="Subscribe to newsletter">
              <span>Subscribe</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </form>
          <p class="footer-newsletter-note">No spam. Unsubscribe anytime. We respect your privacy.</p>
        </div>
        <div class="footer-social">
          <span class="footer-eyebrow">Connect</span>
          <h4>Follow Red Hot Media House</h4>
          <p>Tag us in your wins. We share growth wins from across the network.</p>
          <div class="footer-social-row">
            <a class="social-icon social-icon--linkedin" href="https://www.linkedin.com/company/redhotmediahousepvtltd/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
            </a>
            <a class="social-icon social-icon--instagram" href="https://www.instagram.com/redhotmediahousepvtltd?igsh=OXFta29xZTRsYjI0" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
            </a>
            <a class="social-icon social-icon--youtube" href="https://www.youtube.com/@redhotmediahousepvtltd?si=SOjAm09r1Xa57Tuc" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8A3 3 0 0 0 2.6 19.9c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>
            </a>
            <a class="social-icon social-icon--facebook" href="https://www.facebook.com/redhotmediahousepvtltd/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.68 0H1.32C.59 0 0 .59 0 1.32v21.36C0 23.41.59 24 1.32 24H12.8v-9.29H9.69v-3.62h3.11V8.41c0-3.1 1.89-4.79 4.66-4.79 1.32 0 2.46.1 2.79.14v3.24h-1.91c-1.5 0-1.79.71-1.79 1.76v2.31h3.58l-.47 3.62h-3.11V24h6.13c.73 0 1.32-.59 1.32-1.32V1.32C24 .59 23.41 0 22.68 0z"/></svg>
            </a>
            <a class="social-icon social-icon--x" href="https://x.com/rhmh2019" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.53 2H21l-7.6 8.68L22.5 22h-7.07l-5.55-7.26L3.5 22H0l8.13-9.29L1 2h7.24l5.02 6.64L17.53 2zm-2.48 18h1.96L7.06 4H4.96l10.09 16z"/></svg>
            </a>
            <a class="social-icon social-icon--whatsapp" href="https://wa.me/919582732323" aria-label="WhatsApp" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 3.4A10.4 10.4 0 0 0 3.6 16.1L2 22l6-1.6A10.4 10.4 0 1 0 20.5 3.4zm-8.4 16a8.6 8.6 0 0 1-4.4-1.2l-.3-.2-3.6 1 1-3.5-.2-.3a8.6 8.6 0 1 1 7.5 4.2zm4.7-6.5c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.1-.5 0a7 7 0 0 1-2.1-1.3 7.7 7.7 0 0 1-1.4-1.8c-.2-.3 0-.4.1-.5l.4-.4.2-.4c.1-.1 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4 5.4 5.4 0 0 0 3 .7c.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2-.3-.2-.6-.3z"/></svg>
            </a>
          </div>
          <div class="footer-trust-row">
            <span class="footer-trust-pill"><span class="footer-trust-dot"></span>Performance-Marketing Certified</span>
            <span class="footer-trust-pill"><span class="footer-trust-dot"></span>100+ Brands Served</span>
          </div>
        </div>
      `;
      grid.parentNode.insertBefore(top, grid);
    }

    const bottom = footer.querySelector(".footer-bottom");
    if (bottom && !bottom.querySelector(".footer-legal")) {
      const original = bottom.innerHTML.trim();
      bottom.innerHTML = `
        <span class="footer-copy">${original}</span>
        <nav class="footer-legal" aria-label="Legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Sitemap</a>
        </nav>
      `;
    }

    footer.dataset.enriched = "true";
  }

  // ----------------------------------------------------------------
  // Global form handler — every <form> whose action targets
  // formsubmit.co (or has a data-form attribute) is hijacked and sent
  // via AJAX to FormSubmit.co. Submissions land in
  // info@redhotmediahouse.com after the one-time activation email.
  // ----------------------------------------------------------------
  const FORM_ENDPOINT = "https://formsubmit.co/ajax/info@redhotmediahouse.com";

  // Toast notification host (created lazily on first message)
  let __toastHost = null;
  function ensureToastHost() {
    if (__toastHost) return __toastHost;
    __toastHost = document.createElement("div");
    __toastHost.className = "rh-toast-host";
    __toastHost.setAttribute("aria-live", "polite");
    __toastHost.setAttribute("role", "status");
    document.body.appendChild(__toastHost);
    return __toastHost;
  }
  function showToast(kind, title, body) {
    const host = ensureToastHost();
    const t = document.createElement("div");
    t.className = `rh-toast rh-toast--${kind}`;
    t.innerHTML = `
      <span class="rh-toast__icon" aria-hidden="true">
        ${
          kind === "success"
            ? '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" fill="#22c55e"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" fill="#ff4d4d"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>'
        }
      </span>
      <div class="rh-toast__body">
        <strong>${title}</strong>
        <p>${body}</p>
      </div>
      <button class="rh-toast__close" type="button" aria-label="Dismiss notification">×</button>
    `;
    host.appendChild(t);
    requestAnimationFrame(() => t.classList.add("is-in"));
    const remove = () => {
      t.classList.remove("is-in");
      t.classList.add("is-out");
      setTimeout(() => t.remove(), 360);
    };
    t.querySelector(".rh-toast__close").addEventListener("click", remove);
    setTimeout(remove, kind === "success" ? 6000 : 8000);
  }

  function isFormHandled(form) {
    const action = (form.getAttribute("action") || "").toLowerCase();
    return action.includes("formsubmit.co") || form.hasAttribute("data-form");
  }

  document.addEventListener("submit", async (e) => {
    const form = e.target;
    if (!form || form.tagName !== "FORM") return;
    if (!isFormHandled(form)) return;
    if (form.dataset.handlerBound === "skip") return;

    e.preventDefault();

    // Honeypot — silently drop spam bots
    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value) {
      showToast("success", "Thanks!", "We'll be in touch shortly.");
      form.reset();
      return;
    }

    // Native HTML5 validation
    if (typeof form.checkValidity === "function" && !form.checkValidity()) {
      if (typeof form.reportValidity === "function") form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    const previousDisabled = submitBtn ? submitBtn.disabled : false;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("is-loading");
      const textSpan = submitBtn.querySelector(
        ".uiverse-submit__text, span:not(.uiverse-submit__icon):not(.uiverse-submit__shine)"
      );
      if (textSpan) {
        submitBtn.dataset.savedLabel = textSpan.textContent;
        submitBtn.dataset.savedTarget = "span";
        textSpan.textContent = "Sending…";
      } else {
        submitBtn.dataset.savedLabel = submitBtn.innerHTML;
        submitBtn.dataset.savedTarget = "html";
        submitBtn.textContent = "Sending…";
      }
    }

    // Build payload
    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => {
      if (key === "_honey") return;
      payload[key] = value;
    });
    if (!payload._subject) {
      payload._subject = `New ${form.dataset.form || "Form"} Submission — Red Hot Media House`;
    }
    if (!payload._source) {
      payload._source = `${document.title} — ${window.location.pathname}`;
    }
    payload._formName = form.dataset.form || "Website Form";
    payload._submittedAt = new Date().toISOString();

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === "true" || data.success === true || res.status < 300)) {
        form.reset();
        showToast(
          "success",
          "Message sent successfully!",
          "Thanks for reaching out. Our team will respond within 1 business day."
        );
      } else {
        const msg =
          (data && (data.message || data.error)) ||
          "Something went wrong on our side. Please try again or email us at info@redhotmediahouse.com";
        showToast("error", "We couldn't send that.", msg);
      }
    } catch (err) {
      showToast(
        "error",
        "Network issue",
        "Please check your connection and try again, or email info@redhotmediahouse.com"
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = previousDisabled;
        submitBtn.classList.remove("is-loading");
        const saved = submitBtn.dataset.savedLabel;
        const target = submitBtn.dataset.savedTarget;
        if (saved != null) {
          if (target === "span") {
            const textSpan = submitBtn.querySelector(
              ".uiverse-submit__text, span:not(.uiverse-submit__icon):not(.uiverse-submit__shine)"
            );
            if (textSpan) textSpan.textContent = saved;
          } else {
            submitBtn.innerHTML = saved;
          }
        }
        delete submitBtn.dataset.savedLabel;
        delete submitBtn.dataset.savedTarget;
      }
    }
  });

  // Section graphics: inject lightweight premium SVG marks from mini-title keywords.
  const iconSvgs = {
    about: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8.7 5v10L12 22 3.3 17V7L12 2z" fill="currentColor" opacity=".22"/><path d="M12 5.2l6 3.4v6.8l-6 3.4-6-3.4V8.6l6-3.4z" fill="currentColor"/></svg>`,
    stats: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5h2v14H4zm7 0V9h2v10h-2zm7 0V3h2v16h-2z" fill="currentColor"/><path d="M3 20h19v2H3z" fill="currentColor" opacity=".22"/></svg>`,
    results: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6l-11 11-5-5 1.4-1.4L9 14.2 18.6 4.6 20 6z" fill="currentColor"/><path d="M4 4h10v2H4z" fill="currentColor" opacity=".22"/></svg>`,
    industries: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V8l4-2v2l4-2v3l4-2v13H4z" fill="currentColor"/><path d="M18 10h2v10h-2z" fill="currentColor" opacity=".22"/></svg>`,
    testimonials: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 10.5H5.8c.1-2.7 1.5-4.8 4.2-6.3l1 1.6c-1.7.9-2.6 2.2-2.7 4.2h-.8v4.9H3V10.5h4.5zm13 0h-1.7c.1-2.7 1.5-4.8 4.2-6.3l1 1.6c-1.7.9-2.6 2.2-2.7 4.2h-.8v4.9H16V10.5h4.5z" fill="currentColor"/></svg>`,
    faqs: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-7 17.1V22l3.2-1.7A10 10 0 1 0 12 2zm0 15.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zm1.5-3.9-.9.6c-.5.3-.6.6-.6 1.3v.4h-2v-.5c0-1.3.4-2.2 1.6-2.9l1.1-.7c.4-.3.7-.7.7-1.2 0-.9-.7-1.5-1.7-1.5-1 0-1.7.6-1.8 1.6H8c.1-2.1 1.8-3.6 4.2-3.6 2.4 0 4.2 1.4 4.2 3.5 0 1.2-.6 2.2-1.7 3z" fill="currentColor"/></svg>`,
    blog: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l3 3v17H6V2z" fill="currentColor" opacity=".22"/><path d="M15 2v5h5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 11h8M8 15h8M8 19h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    system: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 7.2l5-.7L12 2z" fill="currentColor"/></svg>`
  };

  // Extended icon library (additional categories)
  const extraIconSvgs = {
    process: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>`,
    services: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" fill="currentColor" opacity=".22"/><path d="M5 5h3v3H5zm11 0h3v3h-3zM5 16h3v3H5zm11 0h3v3h-3z" fill="currentColor"/></svg>`,
    why: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="currentColor" opacity=".22"/><path d="M12 7a3 3 0 0 0-3 3h2a1 1 0 1 1 2 0c0 .8-1 1-1.5 1.7-.4.4-.5.9-.5 1.6h2c0-.5.1-.7.3-1 .5-.6 1.7-1.1 1.7-2.3a3 3 0 0 0-3-3zm-1 8h2v2h-2z" fill="currentColor"/></svg>`,
    benefits: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.5 5.3 5.8.6-4.3 4 1.2 5.7L12 14.8 6.8 17.6 8 11.9 3.7 7.9l5.8-.6L12 2z" fill="currentColor"/></svg>`,
    channels: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="3" fill="currentColor"/><circle cx="18" cy="6" r="3" fill="currentColor"/><circle cx="18" cy="18" r="3" fill="currentColor"/><path d="M9 12l6-6M9 12l6 6" stroke="currentColor" stroke-width="2"/></svg>`,
    impact: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17l5-5 4 4 8-8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 8h6v6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    strategy: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 4l-9 9-3-3-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="6" r="2" fill="currentColor"/><circle cx="18" cy="18" r="2" fill="currentColor"/></svg>`,
    overview: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    build: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21V8l9-6 9 6v13H3z" fill="currentColor" opacity=".22"/><path d="M9 21v-7h6v7" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    stack: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" fill="currentColor"/><path d="M3 13l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    proof: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 6 6 .9-4.5 4.4 1 6.2L12 16.8 6.5 19.5l1-6.2L3 8.9 9 8z" fill="currentColor" opacity=".25"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    contact: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4z" fill="currentColor" opacity=".22"/><path d="M4 4l8 7 8-7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    team: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="9" r="3.2" fill="currentColor"/><circle cx="17" cy="10" r="2.6" fill="currentColor" opacity=".7"/><path d="M3 19c.6-2.6 3-4.5 6-4.5s5.4 1.9 6 4.5M14 19c.5-1.7 2.2-3 4-3s3.5 1.3 4 3" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    model: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity=".55"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity=".55"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor"/></svg>`,
    philosophy: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a4 4 0 0 0-4 4c0 2 1 3 1 5h6c0-2 1-3 1-5a4 4 0 0 0-4-4z" fill="currentColor"/><path d="M9 14h6v2H9zm0 3h6v1.5H9z" fill="currentColor" opacity=".55"/></svg>`,
    vision: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/></svg>`,
    mission: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4l6 6-9 9-5 1 1-5 7-11z" fill="currentColor"/><path d="M3 21l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    ethics: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 4v5c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V7l8-4z" fill="currentColor" opacity=".25"/><path d="M8 12l3 3 5-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };
  Object.assign(iconSvgs, extraIconSvgs);

  const pickMiniTitleIcon = (text) => {
    const t = (text || "").toLowerCase();
    if (t.includes("about")) return iconSvgs.about;
    if (t.includes("stat")) return iconSvgs.stats;
    if (t.includes("result")) return iconSvgs.results;
    if (t.includes("industr")) return iconSvgs.industries;
    if (t.includes("testimonial")) return iconSvgs.testimonials;
    if (t.includes("faq")) return iconSvgs.faqs;
    if (t.includes("blog")) return iconSvgs.blog;
    if (t.includes("process") || t.includes("how it works") || t.includes("workflow") || t.includes("planning")) return iconSvgs.process;
    if (t.includes("service")) return iconSvgs.services;
    if (t.includes("why")) return iconSvgs.why;
    if (t.includes("benefit")) return iconSvgs.benefits;
    if (t.includes("channel")) return iconSvgs.channels;
    if (t.includes("impact") || t.includes("growth")) return iconSvgs.impact;
    if (t.includes("strateg")) return iconSvgs.strategy;
    if (t.includes("overview") || t.includes("explore") || t.includes("introduction")) return iconSvgs.overview;
    if (t.includes("build")) return iconSvgs.build;
    if (t.includes("stack")) return iconSvgs.stack;
    if (t.includes("proof") || t.includes("case wins")) return iconSvgs.proof;
    if (t.includes("contact") || t.includes("reach")) return iconSvgs.contact;
    if (t.includes("team")) return iconSvgs.team;
    if (t.includes("model")) return iconSvgs.model;
    if (t.includes("philosoph")) return iconSvgs.philosophy;
    if (t.includes("vision")) return iconSvgs.vision;
    if (t.includes("mission")) return iconSvgs.mission;
    if (t.includes("ethic") || t.includes("responsib")) return iconSvgs.ethics;
    if (t.includes("system")) return iconSvgs.system;
    return iconSvgs.about;
  };

  document.querySelectorAll(".mini-title").forEach((el) => {
    if (el.dataset.iconized === "true") return;
    const svg = pickMiniTitleIcon(el.textContent);
    const iconWrap = document.createElement("span");
    iconWrap.className = "mini-title-icon";
    iconWrap.innerHTML = svg;
    el.prepend(iconWrap);
    el.dataset.iconized = "true";
  });

  // Auto-wrap each section's heading area in .section-head with a rotating
  // pattern class. This gives every section a uniquely styled header
  // (border + pattern) without changing any HTML across pages.
  const SECTION_PATTERNS = ["section-head--p1", "section-head--p2", "section-head--p3", "section-head--p4"];
  let __secHeadIdx = 0;
  document.querySelectorAll("main > section.section").forEach((sec) => {
    if (sec.classList.contains("hero") || sec.classList.contains("hero-split")) return;
    if (sec.classList.contains("cta-band")) return;
    if (sec.classList.contains("lead-strip")) return;
    if (sec.dataset.headWrapped === "true") return;
    const container = sec.querySelector(":scope > .container");
    if (!container) return;
    const h2 = container.querySelector(":scope > h2");
    if (!h2) return;
    const mini = container.querySelector(":scope > .mini-title");
    let firstP = h2.nextElementSibling;
    while (firstP && !(firstP.tagName === "P")) firstP = firstP.nextElementSibling;

    const head = document.createElement("div");
    head.className = "section-head " + SECTION_PATTERNS[__secHeadIdx % SECTION_PATTERNS.length];
    __secHeadIdx += 1;
    if (mini && mini.parentElement === container) head.appendChild(mini);
    head.appendChild(h2);
    if (firstP && firstP.parentElement === container) head.appendChild(firstP);
    container.prepend(head);
    sec.dataset.headWrapped = "true";
  });

  // ----------------------------------------------------------------
  // Global emoji-to-colorful-SVG replacer — runs once on page load.
  // Walks every text node in the document body and swaps emoji
  // characters for inline gradient SVG icons (with unique gradient IDs).
  // ----------------------------------------------------------------
  let __emojiUid = 0;
  const mkGrad = (c1, c2, c3) => {
    const id = `eg${++__emojiUid}`;
    const stops = c3
      ? `<stop offset="0%" stop-color="${c1}"/><stop offset="50%" stop-color="${c2}"/><stop offset="100%" stop-color="${c3}"/>`
      : `<stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>`;
    return { id, def: `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${stops}</linearGradient></defs>` };
  };
  const svgWrap = (inner) => `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-0.18em;display:inline-block;flex:none">${inner}</svg>`;

  const emojiSvgFactory = {
    "✔": () => { const g = mkGrad("#22c55e", "#10b981"); return svgWrap(`${g.def}<circle cx="12" cy="12" r="10" fill="url(#${g.id})"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#ffffff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`); },
    "✓": () => { const g = mkGrad("#22c55e", "#10b981"); return svgWrap(`${g.def}<circle cx="12" cy="12" r="10" fill="url(#${g.id})"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#ffffff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`); },
    "✅": () => { const g = mkGrad("#22c55e", "#10b981"); return svgWrap(`${g.def}<circle cx="12" cy="12" r="10" fill="url(#${g.id})"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#ffffff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`); },
    "✖": () => { const g = mkGrad("#ff4d4d", "#ff8a3d"); return svgWrap(`${g.def}<circle cx="12" cy="12" r="10" fill="url(#${g.id})"/><path d="M8 8l8 8M16 8l-8 8" stroke="#ffffff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`); },
    "✗": () => { const g = mkGrad("#ff4d4d", "#ff8a3d"); return svgWrap(`${g.def}<circle cx="12" cy="12" r="10" fill="url(#${g.id})"/><path d="M8 8l8 8M16 8l-8 8" stroke="#ffffff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`); },
    "❌": () => { const g = mkGrad("#ff4d4d", "#ff8a3d"); return svgWrap(`${g.def}<circle cx="12" cy="12" r="10" fill="url(#${g.id})"/><path d="M8 8l8 8M16 8l-8 8" stroke="#ffffff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`); },
    "👉": () => { const g = mkGrad("#7b61ff", "#ff4d8a"); return svgWrap(`${g.def}<path d="M3 12h13l-4-4M16 12l-4 4" stroke="url(#${g.id})" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 7v10" stroke="url(#${g.id})" stroke-width="2.4" stroke-linecap="round"/>`); },
    "📈": () => { const g = mkGrad("#22c55e", "#12c2e9"); return svgWrap(`${g.def}<path d="M3 17l5-5 4 4 8-8" stroke="url(#${g.id})" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 8h6v6" stroke="url(#${g.id})" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`); },
    "📉": () => { const g = mkGrad("#ff4d4d", "#ff8a3d"); return svgWrap(`${g.def}<path d="M3 7l5 5 4-4 8 8" stroke="url(#${g.id})" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 16h6v-6" stroke="url(#${g.id})" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`); },
    "📊": () => { const g = mkGrad("#7b61ff", "#12c2e9"); return svgWrap(`${g.def}<rect x="4" y="13" width="3.5" height="7" rx="0.8" fill="url(#${g.id})"/><rect x="10.25" y="9" width="3.5" height="11" rx="0.8" fill="url(#${g.id})"/><rect x="16.5" y="5" width="3.5" height="15" rx="0.8" fill="url(#${g.id})"/>`); },
    "🚀": () => { const g = mkGrad("#ff4d4d", "#ff8a3d", "#7b61ff"); return svgWrap(`${g.def}<path d="M14 4c4 0 6 2 6 6 0 3-2 5-5 6l-3-3c1-3 3-5 6-5l-4-4z" fill="url(#${g.id})"/><path d="M11 13l-3 3-3-3 3-3z" fill="url(#${g.id})" opacity=".6"/><path d="M5 19l-1 1 2-1 1-2-2 2z" fill="#ff4d4d"/>`); },
    "🎯": () => { const g = mkGrad("#ff4d4d", "#7b61ff"); return svgWrap(`${g.def}<circle cx="12" cy="12" r="9" stroke="url(#${g.id})" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="5" stroke="url(#${g.id})" stroke-width="2" fill="none" opacity=".6"/><circle cx="12" cy="12" r="2" fill="url(#${g.id})"/>`); },
    "⚡": () => { const g = mkGrad("#ff8a3d", "#ff4d4d"); return svgWrap(`${g.def}<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="url(#${g.id})"/>`); },
    "🌟": () => { const g = mkGrad("#ff8a3d", "#ffd24d"); return svgWrap(`${g.def}<path d="M12 2l2.7 6.6 7.1.6-5.4 4.7 1.7 7L12 17.3 5.9 20.9l1.7-7L2.2 9.2l7.1-.6L12 2z" fill="url(#${g.id})"/>`); },
    "⭐": () => { const g = mkGrad("#ff8a3d", "#ffd24d"); return svgWrap(`${g.def}<path d="M12 2l2.7 6.6 7.1.6-5.4 4.7 1.7 7L12 17.3 5.9 20.9l1.7-7L2.2 9.2l7.1-.6L12 2z" fill="url(#${g.id})"/>`); },
    "💡": () => { const g = mkGrad("#ffd24d", "#ff8a3d"); return svgWrap(`${g.def}<path d="M9 17h6v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2zM12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z" fill="url(#${g.id})"/>`); },
    "🔥": () => { const g = mkGrad("#ff4d4d", "#ff8a3d", "#ffd24d"); return svgWrap(`${g.def}<path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 1-5 0 2 2 3 4 3 0-3-1-5 0-8z" fill="url(#${g.id})"/>`); },
    "🎨": () => { const g = mkGrad("#7b61ff", "#ff4d8a"); return svgWrap(`${g.def}<path d="M12 2a10 10 0 0 0 0 20c2 0 2-1 2-2.5 0-1 .8-2 2-2h2a4 4 0 0 0 4-4A10 10 0 0 0 12 2z" fill="url(#${g.id})"/><circle cx="7" cy="9" r="1.4" fill="#ffffff"/><circle cx="11" cy="6" r="1.4" fill="#ffffff"/><circle cx="16" cy="8" r="1.4" fill="#ffffff"/>`); },
    "💼": () => { const g = mkGrad("#7b61ff", "#12c2e9"); return svgWrap(`${g.def}<rect x="3" y="7" width="18" height="13" rx="2" fill="url(#${g.id})"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="url(#${g.id})" stroke-width="2" fill="none"/>`); },
    "📱": () => { const g = mkGrad("#7b61ff", "#ff4d8a"); return svgWrap(`${g.def}<rect x="6.5" y="2.5" width="11" height="19" rx="2.5" stroke="url(#${g.id})" stroke-width="1.6" fill="rgba(123,97,255,0.10)"/><circle cx="12" cy="18.5" r="0.9" fill="url(#${g.id})"/>`); },
    "💻": () => { const g = mkGrad("#12c2e9", "#7b61ff"); return svgWrap(`${g.def}<rect x="3" y="4.5" width="18" height="12" rx="2" stroke="url(#${g.id})" stroke-width="1.8" fill="rgba(18,194,233,0.08)"/><path d="M2 19h20" stroke="url(#${g.id})" stroke-width="1.8" stroke-linecap="round"/>`); },
    "🔍": () => { const g = mkGrad("#ff4d4d", "#ff8a3d"); return svgWrap(`${g.def}<circle cx="10.5" cy="10.5" r="6.2" stroke="url(#${g.id})" stroke-width="2" fill="rgba(255,138,61,0.10)"/><path d="M14.8 14.8l5.2 5.2" stroke="url(#${g.id})" stroke-width="2.4" stroke-linecap="round"/>`); },
    "👥": () => { const g = mkGrad("#7b61ff", "#12c2e9"); return svgWrap(`${g.def}<circle cx="9" cy="9" r="3.4" fill="url(#${g.id})"/><circle cx="16.5" cy="10" r="2.8" fill="url(#${g.id})" opacity=".75"/><path d="M2.5 19c.5-3.2 3.1-5 6.5-5s6 1.8 6.5 5z" fill="url(#${g.id})"/><path d="M14 19c.4-2.4 2.2-3.8 4.5-3.8s4.1 1.4 4.5 3.8z" fill="url(#${g.id})" opacity=".75"/>`); },
    "🤝": () => { const g = mkGrad("#22c55e", "#7b61ff"); return svgWrap(`${g.def}<path d="M3 12l4-4 3 1 4 4-2 2-3-2-2 2-4-3z" fill="url(#${g.id})"/><path d="M21 12l-4-4-3 1-4 4 2 2 3-2 2 2 4-3z" fill="url(#${g.id})" opacity=".75"/>`); },
    "💰": () => { const g = mkGrad("#ffd24d", "#ff8a3d"); return svgWrap(`${g.def}<circle cx="12" cy="12" r="9" fill="url(#${g.id})"/><text x="12" y="16" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="11" fill="#ffffff">$</text>`); },
    "🏆": () => { const g = mkGrad("#ffd24d", "#ff8a3d"); return svgWrap(`${g.def}<path d="M7 4h10v3a5 5 0 0 1-10 0V4z" fill="url(#${g.id})"/><path d="M9 14h6v3l1 3H8l1-3z" fill="url(#${g.id})" opacity=".85"/><path d="M5 6h2v3a3 3 0 0 1-3-3V6h1zM17 6h2v0a3 3 0 0 1-3 3V6h1z" fill="url(#${g.id})"/>`); },
    "✉": () => { const g = mkGrad("#ff4d4d", "#7b61ff"); return svgWrap(`${g.def}<rect x="3" y="5" width="18" height="14" rx="2.2" fill="url(#${g.id})"/><path d="M3.6 6.5l8.4 6.2 8.4-6.2" stroke="#ffffff" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`); },
    "☎": () => { const g = mkGrad("#22c55e", "#12c2e9"); return svgWrap(`${g.def}<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z" fill="url(#${g.id})"/>`); },
    "📞": () => { const g = mkGrad("#22c55e", "#12c2e9"); return svgWrap(`${g.def}<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z" fill="url(#${g.id})"/>`); }
  };

  // Build regex(es) matching all emoji keys. We keep two: one stateless
  // for predicate checks, one with /g for splitting.
  const emojiKeys = Object.keys(emojiSvgFactory);
  const emojiPattern =
    "(" + emojiKeys.map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|") + ")";
  const emojiTestRe = new RegExp(emojiPattern); // no /g → stateless .test()
  const emojiSplitRe = new RegExp(emojiPattern, "g");

  function replaceEmojisIn(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        const p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return NodeFilter.FILTER_REJECT;
        if (p.classList && (p.classList.contains("emoji-svg") || p.closest(".emoji-svg"))) return NodeFilter.FILTER_REJECT;
        return emojiTestRe.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const targets = [];
    while (walker.nextNode()) targets.push(walker.currentNode);
    const CHECK_SET = new Set(["✔", "✓", "✅"]);
    const CROSS_SET = new Set(["✖", "✗", "❌"]);
    targets.forEach((node) => {
      const text = node.nodeValue;
      const parts = text.split(emojiSplitRe);
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        if (!part) return;
        if (emojiSvgFactory[part]) {
          const span = document.createElement("span");
          span.className = "emoji-svg";
          span.setAttribute("aria-hidden", "true");
          if (CHECK_SET.has(part)) span.dataset.kind = "check";
          else if (CROSS_SET.has(part)) span.dataset.kind = "cross";
          span.innerHTML = emojiSvgFactory[part]();
          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });
      node.parentNode.replaceChild(frag, node);
    });
  }
  replaceEmojisIn(document.body);

  // Swap legacy <img src="images/icon-check.png"> / icon-cross.png with
  // colorful gradient SVGs to match the rest of the icon system.
  document.querySelectorAll('img[src*="icon-check"], img[src*="icon-cross"]').forEach((img) => {
    const isCheck = /icon-check/i.test(img.getAttribute("src") || "");
    const wrap = document.createElement("span");
    wrap.className = "emoji-svg" + (isCheck ? " emoji-svg--check" : " emoji-svg--cross");
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = isCheck ? emojiSvgFactory["✔"]() : emojiSvgFactory["✖"]();
    img.replaceWith(wrap);
  });

  // Inside .feature-list items the CSS already paints a check bullet via
  // ::before. If the user wrote a leading "✔"/"✓"/"✅" that we just
  // converted to an .emoji-svg, drop it to avoid a double checkmark.
  // Other emoji types (📈, 🎯 …) are kept since they convey extra meaning.
  document.querySelectorAll(".feature-list > li").forEach((li) => {
    const first = li.firstChild;
    if (!first || first.nodeType !== 1) return;
    if (!first.classList || !first.classList.contains("emoji-svg")) return;
    if (first.dataset.kind !== "check") return;
    const sib = first.nextSibling;
    if (sib && sib.nodeType === 3) sib.nodeValue = sib.nodeValue.replace(/^\s+/, "");
    first.remove();
  });

  // If a card heading now starts with a generated .emoji-svg (from the
  // global replacer), apply the flex card-heading-with-icon layout so the
  // icon and text align cleanly across all card components.
  document.querySelectorAll(".card h3, .card h4").forEach((h) => {
    if (h.dataset.iconified === "true") return;
    const first = h.firstChild;
    if (!first) return;
    const isEmojiFirst =
      first.nodeType === 1 && first.classList && first.classList.contains("emoji-svg");
    if (!isEmojiFirst) return;
    h.classList.add("card-heading-with-icon");
    const next = first.nextSibling;
    if (next && next.nodeType === 3 && /^\s+/.test(next.nodeValue)) {
      next.nodeValue = next.nodeValue.replace(/^\s+/, "");
    }
    h.dataset.iconified = "true";
  });

  // Replace emoji-based service tile icons with premium inline SVG icons.
  const tileIconSvgs = {
    "🔍": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 3a7.5 7.5 0 1 0 4.6 13.4l4 4 1.4-1.4-4-4A7.5 7.5 0 0 0 10.5 3zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z" fill="currentColor"/></svg>`,
    "📱": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v14h8V5H8zm4 15.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="currentColor"/></svg>`,
    "💻": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5zm2 0v10h12V5H6z" fill="currentColor"/><path d="M2 20h20v2H2z" fill="currentColor" opacity=".22"/></svg>`,
    "💰": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v10H4V7zm2 2v6h12V9H6z" fill="currentColor"/><path d="M12 10.2c1.3 0 2.2.6 2.2 1.8 0 1.4-1.3 1.7-2.3 1.9-.7.1-1 .3-1 .6 0 .3.3.5 1 .5.6 0 1.1-.2 1.6-.6l1 1.3c-.6.5-1.4.8-2.3.9V18h-1.6v-1c-1.3-.2-2.3-1-2.3-2.3 0-1.5 1.3-1.9 2.4-2.1.7-.1 1-.3 1-.6 0-.3-.3-.5-.9-.5-.7 0-1.4.3-1.9.7l-.9-1.3c.6-.6 1.6-1 2.7-1.1V9h1.6v1.2z" fill="currentColor" opacity=".9"/></svg>`
  };

  document.querySelectorAll(".card > div[style*=\"font-size:32px\"]").forEach((el) => {
    if (el.dataset.iconized === "true") return;
    const emoji = (el.textContent || "").trim();
    const svg = tileIconSvgs[emoji];
    if (!svg) return;
    const wrap = document.createElement("div");
    wrap.className = "card-icon";
    wrap.innerHTML = svg;
    el.replaceWith(wrap);
  });

  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(mobileMenu.classList.contains("open")));
    });
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const servicesMobileChevron = document.querySelector(".services-mobile-chevron");
  const servicesMobileSub = document.querySelector(".mobile-services-sub");
  if (servicesMobileChevron && servicesMobileSub) {
    servicesMobileChevron.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      servicesMobileSub.classList.toggle("open");
    });
  }

  const industriesMobileChevron = document.querySelector(".industries-mobile-chevron");
  const industriesMobileSub = document.querySelector(".mobile-industries-sub");
  if (industriesMobileChevron && industriesMobileSub) {
    industriesMobileChevron.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      industriesMobileSub.classList.toggle("open");
    });
  }

  const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("href")?.toLowerCase() === page) link.classList.add("active");
  });

  // Ensure base content is visible even if cinematic timelines delay.
  document.querySelectorAll(".fade-in").forEach((el) => el.classList.add("visible"));

  document.querySelectorAll(".accordion-header").forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isOpen = button.classList.contains("open");
      document.querySelectorAll(".accordion-header").forEach((b) => {
        b.classList.remove("open");
        b.setAttribute("aria-expanded", "false");
        const icon = b.querySelector("span");
        if (icon) icon.textContent = "+";
      });
      document.querySelectorAll(".accordion-content").forEach((c) => (c.style.maxHeight = null));
      if (!isOpen && content) {
        button.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        const icon = button.querySelector("span");
        if (icon) icon.textContent = "-";
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });

  document.querySelectorAll("form[novalidate]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
      }
    });
  });

  document.querySelectorAll("[data-filter-group]").forEach((wrap) => {
    const buttons = wrap.querySelectorAll(".filter-btn");
    const targetSel = wrap.getAttribute("data-filter-target");
    const cards = targetSel ? document.querySelectorAll(targetSel) : [];
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        cards.forEach((card) => {
          const show = filter === "all" || card.dataset.category === filter;
          card.style.display = show ? "" : "none";
        });
      });
    });
  });

  // ------------------------------------------------------------
  // Testimonials (vertical auto-scrolling columns)
  // Preserves existing testimonial content (quotes + names).
  // ------------------------------------------------------------
  const col1 = document.getElementById("col1");
  const col2 = document.getElementById("col2");
  const col3 = document.getElementById("col3");
  if (col1 && col2 && col3) {
    const avatar = (letter, c1, c2) =>
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="80" height="80" rx="40" fill="url(#g)"/><text x="40" y="48" text-anchor="middle" font-family="Inter,system-ui" font-size="28" font-weight="800" fill="#111">${letter}</text></svg>`
      );

    const testimonials = [
      {
        text: "“Our pre-launch campaigns and local SEO brought solid walk-ins and broker interest faster than we expected. Reporting was clear and the team stayed hands-on until handover.”",
        name: "Vikram Singh",
        role: "Director, Radha Rani Residency Pvt Ltd",
        image: avatar("V", "#5eead4", "#0d9488"),
      },
      {
        text: "“Lead quality from Meta and Google improved after they rebuilt our funnels and ad creative. We finally measure cost per qualified lead instead of guessing.”",
        name: "Neha Kapoor",
        role: "Co-founder, Property Wale",
        image: avatar("N", "#fcd34d", "#b45309"),
      },
      {
        text: "“They kept our social presence playful without looking cheap. Parents mention Instagram before the website, and engagement on reels has been a real footfall driver.”",
        name: "Rahul Desai",
        role: "Founder, TUK&TUK Kids",
        image: avatar("R", "#93c5fd", "#1d4ed8"),
      },
      {
        text: "“Catalogue creative and performance banners finally look like one brand. Distributors notice the consistency, and our festive push broke last year’s online sales.”",
        name: "Kavya Iyer",
        role: "Brand Head, Malanchi",
        image: avatar("K", "#fdba74", "#c2410c"),
      },
      {
        text: "“Healthcare marketing needs the right tone. Organic visibility and appointment-related queries are up, and nothing feels pushy or off-brand for a fertility-focused care centre.”",
        name: "Sanjay Menon",
        role: "Centre Administrator, Medini Care",
        image: avatar("S", "#fbcfe8", "#be185d"),
      },
      {
        text: "“We’re B2B and technical. They turned our services into landing pages and ad copy that actually bring RFQs from serious project owners, not random clicks.”",
        name: "Arjun Patel",
        role: "Business Development, mtb Engineers",
        image: avatar("A", "#86efac", "#15803d"),
      },
      {
        text: "“Local search and our Google Business profile were weak. Now key specialties show up reliably, and the team shifts budgets when a campaign saturates.”",
        name: "Meera Joshi",
        role: "Marketing Coordinator, Kashvi Multi Speciality Center",
        image: avatar("M", "#6ee7b7", "#047857"),
      },
      {
        text: "“They respected a calm, trust-first voice. Clearer website paths and patient education content cut repeat phone questions and made first visits easier.”",
        name: "Aarti Nair",
        role: "Practice Manager, Healing Women Clinic",
        image: avatar("A", "#f9a8d4", "#9d174d"),
      },
      {
        text: "“Tracking and remarketing were wired properly from day one. We see steadier appointment requests from high-intent searches in our city.”",
        name: "Ritu Saxena",
        role: "Clinic Manager, Dr. Jyoti Bhaskar — Caring Hands",
        image: avatar("R", "#e9d5ff", "#6b21a8"),
      },
      {
        text: "“Seasonal campaigns finally line up online with what’s in the store. Festive ROAS has been the strongest we’ve seen, without discounting our brand.”",
        name: "Shreya Malhotra",
        role: "Owner, Galleria Clothings",
        image: avatar("S", "#fca5a5", "#b91c1c"),
      },
      {
        text: "“Case studies and LinkedIn targeting put us in front of architects and corporates we actually want. Inquiries are fewer but much more relevant for fit-out work.”",
        name: "Karan Thakur",
        role: "Director, Brandkettle",
        image: avatar("K", "#bbf7d0", "#14532d"),
      },
      {
        text: "“Our digital presence finally matches how we operate on the ground. Inbound leads are easier for the team to qualify and follow up.”",
        name: "Pankaj Sahani",
        role: "Partner, Diwan Chand Sahani & Sons LLP",
        image: avatar("P", "#fde047", "#365314"),
      },
      {
        text: "“Story-led creatives and tight geo-targeting reached plot buyers without wasteful spend. Weekly readouts kept sales and marketing aligned on what was working.”",
        name: "Devika Nambiar",
        role: "Project Lead, Bansuri Dham Vrindavan Farms",
        image: avatar("D", "#a7f3d0", "#0f766e"),
      },
    ];

    const firstColumn = testimonials.slice(0, 5);
    const secondColumn = testimonials.slice(5, 10);
    const thirdColumn = testimonials.slice(10, 13);

    const escHtml = (s) =>
      String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    function buildColumn(colId, items, duration) {
      const col = document.getElementById(colId);
      if (!col) return;

      col.innerHTML = "";
      const doubled = [...items, ...items];
      doubled.forEach(({ text, name, role, image }) => {
        const card = document.createElement("div");
        card.className = "testimonial-card";
        card.innerHTML = `
          <p>${escHtml(text)}</p>
          <div class="testimonial-author">
            <img src="${image.replace(/"/g, "&quot;")}" alt="${escHtml(name)}" />
            <div>
              <div class="author-name">${escHtml(name)}</div>
              <div class="author-role">${escHtml(role)}</div>
            </div>
          </div>
        `;
        col.appendChild(card);
      });

      let pos = 0;
      // Faster scroll (was 60/duration)
      const speed = 140 / duration;

      function getHalfHeight() {
        return col.scrollHeight / 2;
      }

      function animate() {
        pos += speed * 0.016;
        const half = getHalfHeight();
        if (half > 0 && pos >= half) pos -= half;
        col.style.transform = `translateY(-${pos}px)`;
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }

    buildColumn("col1", firstColumn, 15);
    buildColumn("col2", secondColumn, 19);
    buildColumn("col3", thirdColumn, 17);
  }

  const splitWords = (el) => {
    if (!el || el.dataset.split === "true") return [];
    // Keep manual markup (line breaks, gradient spans, etc.) — word-split would strip it
    // and only the first token would get .is-highlight.
    const preserveHeroTitle =
      el.dataset.noWordSplit === "true" ||
      (el.tagName === "H1" && el.querySelector("br"));
    if (preserveHeroTitle) {
      el.dataset.split = "true";
      return [el];
    }
    const words = (el.textContent || "").trim().split(/\s+/).filter(Boolean);
    el.innerHTML = words
      .map((word, idx) => {
        const highlight = idx === 0 ? " is-highlight" : "";
        return `<span class="word hero-word${highlight}">${word}</span>`;
      })
      .join(" ");
    el.dataset.split = "true";
    return Array.from(el.querySelectorAll(".word"));
  };

  const animateCounter = (el) => {
    if (!el || el.dataset.counted === "true") return;
    el.dataset.counted = "true";

    const dataTarget = el.dataset.counter;
    const suffix = el.dataset.suffix || "";
    const decimals = Number(el.dataset.decimals || "0");

    let target = 0;
    let prefix = "";
    let trailing = suffix;

    if (dataTarget) {
      target = Number(dataTarget || "0");
    } else {
      const raw = (el.textContent || "").trim();
      const match = raw.match(/^([+])?(\d+(?:\.\d+)?)(X|%|x)?$/);
      if (!match) return;
      prefix = match[1] || "";
      target = Number(match[2] || "0");
      trailing = match[3] || "";
    }

    const startTime = performance.now();
    const durationMs = 1000;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const frame = (now) => {
      const t = Math.min((now - startTime) / durationMs, 1);
      const value = ease(t) * target;
      const formatted = dataTarget ? `${value.toFixed(decimals)}${suffix}` : `${prefix}${value.toFixed(target % 1 ? 1 : 0)}${trailing}`;
      el.textContent = formatted;
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const sections = Array.from(document.querySelectorAll("main > section"));

  // Alternate section header alignment (left / right / center)
  // Only affects the header elements (mini-title, h2, muted intro),
  // not grids/cards/forms.
  const alignCycle = ["align-left", "align-right", "align-center"];
  let alignIdx = 0;
  sections.forEach((section) => {
    // Skip hero + special full-bleed sections
    if (section.classList.contains("hero-split")) return;
    if (section.classList.contains("lead-strip")) return;

    section.classList.remove("align-left", "align-right", "align-center");

    // Force certain sections to always be center-aligned regardless of cycle.
    if (
      section.classList.contains("testimonials-section") ||
      section.classList.contains("logo-section") ||
      section.classList.contains("cta-band") ||
      section.classList.contains("industries-band")
    ) {
      section.classList.add("align-center");
      return;
    }

    section.classList.add(alignCycle[alignIdx % alignCycle.length]);
    alignIdx += 1;
  });

  if (prefersReducedMotion) {
    sections.forEach((section) => {
      section.classList.remove("section-hidden");
      section.classList.add("section-visible");
    });
    document.querySelectorAll("[data-counter], .section:nth-of-type(10) .stat-value").forEach((el) => animateCounter(el));
    return;
  }

  // Premium hover interaction: subtle 3D tilt for cards/steps/stats (pointer devices).
  const tiltTargets = document.querySelectorAll(".card, .step, .stat-box, .testimonial-card");
  const allowTilt = typeof window.matchMedia === "function" && window.matchMedia("(pointer: fine)").matches;
  if (allowTilt) {
    tiltTargets.forEach((el) => {
      el.classList.add("tilt");
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const ry = (px - 0.5) * 8;
        const rx = (0.5 - py) * 6;
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      });
      el.addEventListener("mouseleave", () => {
        el.style.setProperty("--rx", `0deg`);
        el.style.setProperty("--ry", `0deg`);
      });
    });
  }

  if (hasGSAP) {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const reveal = (triggerEl, targets, vars = {}) => {
      if (!triggerEl || !targets || !targets.length) return;
      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: "auto",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
        ...vars,
      });
    };

    const hero = sections[0];
    if (hero) {
      const heroWords = splitWords(hero.querySelector("h1"));
      reveal(hero, heroWords, { y: 36, stagger: 0.06, duration: 0.65 });
      reveal(hero, hero.querySelectorAll(".hero-trust p"), { y: 20, stagger: 0.08, duration: 0.55, delay: 0.1 });
      const heroVideo = hero.querySelector(".hero-video video");
      if (heroVideo) {
        gsap.from(heroVideo, {
          scale: 1.05,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: hero, start: "top 80%", once: true },
        });
      }
    }

    const mobileNoPan =
      typeof window.matchMedia === "function" && window.matchMedia("(max-width: 767px)").matches;

    sections.forEach((section) => {
      const isCenter = section.classList.contains("align-center");
      const isLeft = section.classList.contains("align-left");
      const isRight = section.classList.contains("align-right");
      const isSplit = section.classList.contains("tmpl-split");
      const isBento = section.classList.contains("tmpl-bento");
      const isProof = section.classList.contains("tmpl-proof");

      // Direction rules:
      // - center: top -> bottom (y)
      // - left aligned content: right -> left (x+)
      // - right aligned content: left -> right (x-)
      // Narrow viewports: never pan horizontally — translateX + overflow-x clip cuts off cards.
      const dir = isCenter
        ? { x: 0, y: 22 }
        : isLeft
          ? { x: 28, y: 0 }
          : isRight
            ? { x: -28, y: 0 }
            : { x: 0, y: 22 };
      const motionDir = mobileNoPan ? { x: 0, y: dir.y } : dir;

      // Premium feel: animate section headings (word-by-word)
      const h2Words = splitWords(section.querySelector("h2"));
      reveal(section, h2Words, { ...motionDir, stagger: 0.05, duration: 0.6 });

      // Cards + blocks: follow direction, but slightly softer
      const blocks = section.querySelectorAll(".card, .stat-box, .step, .testimonial-card, .accordion-item");
      reveal(section, blocks, {
        x: motionDir.x ? motionDir.x * 0.8 : 0,
        y: motionDir.y ? motionDir.y * 0.8 : 18,
        stagger: 0.08,
      });

      // Pills/badges: subtle pop-in
      const pills = section.querySelectorAll(".badge, .logo-pill, .mini-title");
      reveal(section, pills, {
        x: motionDir.x ? motionDir.x * 0.6 : 0,
        y: motionDir.y ? 14 : 0,
        scale: 0.97,
        stagger: 0.05,
        duration: 0.5,
      });

      // Inputs/buttons: match direction for a cohesive entrance
      const fields = section.querySelectorAll("input, textarea, button.btn");
      reveal(section, fields, {
        x: motionDir.x ? motionDir.x * 0.7 : 0,
        y: motionDir.y ? 18 : 0,
        stagger: 0.06,
        duration: 0.55,
      });

      // Template-specific premium motion (services pages)
      if (isSplit) {
        const panel = section.querySelectorAll(".split-panel");
        reveal(section, panel, { opacity: 0, scale: 0.96, y: 18, duration: 0.7, stagger: 0.12 });
      }
      if (isBento) {
        const cards = section.querySelectorAll(".cards-grid > .card");
        reveal(section, cards, { opacity: 0, y: 22, duration: 0.75, stagger: 0.07 });
      }
      if (isProof) {
        const stats = section.querySelectorAll(".stat-box");
        reveal(section, stats, { opacity: 0, y: 18, duration: 0.65, stagger: 0.08 });
      }
    });

    document.querySelectorAll(".stat-value").forEach((counterEl) => {
      ScrollTrigger.create({
        trigger: counterEl.closest("section") || counterEl,
        start: "top 76%",
        once: true,
        onEnter: () => animateCounter(counterEl),
      });
    });
  } else {
    // IntersectionObserver fallback (when GSAP unavailable)
    sections.forEach((section) => section.classList.add("section-hidden"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("section-hidden");
        entry.target.classList.add("section-visible");
        entry.target.querySelectorAll(".stat-value").forEach((el) => animateCounter(el));
      });
    }, { threshold: 0.2 });
    sections.forEach((section) => observer.observe(section));
  }

  // ------------------------------------------------------------
  // Logo carousel (Trusted by) — infinite auto-scroll
  // Keep existing logo names from the old section.
  // ------------------------------------------------------------
  const track = document.getElementById("logoTrack");
  if (track) {
    const logos = [
      { name: "Radha Rani Residency Pvt Ltd", image: "images/RadhaRaniResidency.jpeg" },
      { name: "Property Wale", image: "images/PropertyWalle.jpeg" },
      { name: "TUK&TUK Kids", image: "images/TukTukKids.jpeg" },
      { name: "Malanchi", image: "images/Malanchi.jpeg" },
      { name: "Medini Care", image: "images/MediniCare.jpeg" },
      { name: "mtb Engineers", image: "images/ImtbEngineers.jpeg" },
      { name: "Kashvi Multi Speciality Center", image: "images/KashviHospital.jpeg" },
      { name: "Healing Women Clinic", image: "images/DrNeeluHealingWomen.jpeg" },
      { name: "Dr. Jyoti Bhaskar — Caring Hands", image: "images/DrJyotiBhaskar.jpeg" },
      { name: "Galleria Clothings", image: "images/GalleriaClothings.jpeg" },
      { name: "Brandkettle", image: "images/brandkettle.jpg" },
      { name: "Diwan Chand Sahani & Sons LLP", image: "images/Dcs.jpg" },
      { name: "Bansuri Dham Vrindavan Farms", image: "images/vertex-labs.png" },
    ];

    // This project previously used text-only "fake logos".
    // Convert names into lightweight SVG logo images (data URLs).
    const svgLogo = (name) => {
      const safe = String(name || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="220" height="48" viewBox="0 0 220 48">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stop-color="#111827"/>
              <stop offset="1" stop-color="#6b7280"/>
            </linearGradient>
          </defs>
          <rect x="0.5" y="0.5" width="219" height="47" rx="12" fill="white" fill-opacity="0" />
          <text x="110" y="30" text-anchor="middle" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="16" font-weight="700" fill="url(#g)">${safe}</text>
        </svg>
      `.trim();
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    };

    logos.forEach((l) => {
      if (!l.image) l.image = svgLogo(l.name);
    });

    function buildTrack() {
      track.innerHTML = "";
      [...logos, ...logos, ...logos].forEach((logo) => {
        const item = document.createElement("div");
        item.className = "carousel-item";
        const img = document.createElement("img");
        img.src = logo.image.startsWith("data:") ? logo.image : encodeURI(logo.image);
        img.alt = logo.name;
        item.appendChild(img);
        track.appendChild(item);
      });
    }

    buildTrack();

    let pos = 0;
    let paused = false;

    function getSingleWidth() {
      const items = track.querySelectorAll(".carousel-item");
      let w = 0;
      for (let i = 0; i < logos.length; i++) w += items[i]?.offsetWidth || 0;
      return w;
    }

    function animate() {
      if (!paused) {
        pos += 0.5;
        const singleWidth = getSingleWidth();
        if (singleWidth > 0 && pos >= singleWidth) pos -= singleWidth;
        track.style.transform = `translate3d(-${Math.round(pos)}px, 0, 0)`;
      }
      requestAnimationFrame(animate);
    }

    track.addEventListener("mouseenter", () => (paused = true));
    track.addEventListener("mouseleave", () => (paused = false));
    requestAnimationFrame(animate);
  }
});
