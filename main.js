document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

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
