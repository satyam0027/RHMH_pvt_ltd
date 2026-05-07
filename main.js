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
          <a class="topbar-link" href="mailto:hello@redhotmediahouse.com" aria-label="Email Red Hot Media House">
            <span class="topbar-ico" aria-hidden="true">✉</span>
            <span>hello@redhotmediahouse.com</span>
          </a>
          <a class="topbar-link" href="tel:+91XXXXXXXXXX" aria-label="Call Red Hot Media House">
            <span class="topbar-ico" aria-hidden="true">☎</span>
            <span>+91 XXXXXXXXXX</span>
          </a>
        </div>
        <div class="topbar-right">
          <a class="topbar-link topbar-link--whatsapp" href="https://wa.me/91XXXXXXXXXX" aria-label="Chat on WhatsApp">
            <span class="topbar-ico" aria-hidden="true">WA</span>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    `;
    header.prepend(topbar);
    header.dataset.topbar = "true";
  }

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

  const pickMiniTitleIcon = (text) => {
    const t = (text || "").toLowerCase();
    if (t.includes("about")) return iconSvgs.about;
    if (t.includes("stats")) return iconSvgs.stats;
    if (t.includes("results")) return iconSvgs.results;
    if (t.includes("industr")) return iconSvgs.industries;
    if (t.includes("testimonial")) return iconSvgs.testimonials;
    if (t.includes("faq")) return iconSvgs.faqs;
    if (t.includes("blog")) return iconSvgs.blog;
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

  // Replace leading "✔" in card headings with premium check badge.
  document.querySelectorAll("h3").forEach((h3) => {
    if (h3.dataset.checkified === "true") return;
    const txt = (h3.textContent || "").trim();
    if (!txt.startsWith("✔")) return;
    const clean = txt.replace(/^✔\s*/, "");
    h3.textContent = "";
    h3.classList.add("card-heading-with-icon");
    const badge = document.createElement("span");
    badge.className = "icon-badge icon-badge--img";
    badge.setAttribute("aria-hidden", "true");
    const img = document.createElement("img");
    img.src = "images/icon-check.png";
    img.alt = "";
    img.decoding = "async";
    img.loading = "lazy";
    badge.appendChild(img);
    const span = document.createElement("span");
    span.textContent = clean;
    h3.appendChild(badge);
    h3.appendChild(span);
    h3.dataset.checkified = "true";
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

  const splitWords = (el) => {
    if (!el || el.dataset.split === "true") return [];
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

    sections.forEach((section) => {
      // Premium feel: animate section headings (word-by-word)
      const h2Words = splitWords(section.querySelector("h2"));
      reveal(section, h2Words, { y: 22, stagger: 0.05, duration: 0.6 });
      reveal(section, section.querySelectorAll(".card, .stat-box, .step, .testimonial-card, .accordion-item"), { stagger: 0.08 });
      reveal(section, section.querySelectorAll(".badge, .logo-pill"), { y: 14, scale: 0.97, stagger: 0.05, duration: 0.5 });
      reveal(section, section.querySelectorAll("input, textarea, button.btn"), { y: 20, stagger: 0.06, duration: 0.55 });
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
});
