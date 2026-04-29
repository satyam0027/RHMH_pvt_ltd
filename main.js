document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
  const hasTHREE = typeof window.THREE !== "undefined";

  if (hasGSAP && hasScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
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

  const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("href")?.toLowerCase() === page) link.classList.add("active");
  });

  const fadeEls = Array.from(document.querySelectorAll(".fade-in"));
  fadeEls.forEach((el, idx) => {
    if (!el.dataset.delay) el.dataset.delay = String(Math.min(idx * 70, 280));
    el.style.transitionDelay = `${el.dataset.delay}ms`;
  });

  // Reveal animations (GSAP preferred, fallback to IntersectionObserver)
  if (prefersReducedMotion) {
    fadeEls.forEach((el) => el.classList.add("visible"));
  } else if (hasGSAP && hasScrollTrigger) {
    window.gsap.set(fadeEls, { opacity: 0, y: 14, filter: "blur(6px)" });
    fadeEls.forEach((el) => {
      const delay = Number(el.dataset.delay || "0") / 1000;
      window.gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onStart: () => el.classList.add("visible"),
      });
    });
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    fadeEls.forEach((el) => observer.observe(el));
  }

  // Counters (GSAP preferred, fallback to requestAnimationFrame)
  document.querySelectorAll("[data-counter]").forEach((counter) => {
    const target = Number(counter.dataset.counter || "0");
    const suffix = counter.dataset.suffix || "";
    const durationMs = 1100;

    if (prefersReducedMotion) {
      counter.textContent = `${target}${suffix}`;
      return;
    }

    if (hasGSAP && hasScrollTrigger) {
      const state = { v: 0 };
      window.gsap.to(state, {
        v: target,
        duration: durationMs / 1000,
        ease: "power3.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          counter.textContent = `${Math.floor(state.v)}${suffix}`;
        },
      });
      return;
    }

    let started = false;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / durationMs, 1);
          const value = Math.floor(easeOutCubic(t) * target);
          counter.textContent = `${value}${suffix}`;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    counterObserver.observe(counter);
  });

  document.querySelectorAll(".accordion-header").forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isOpen = button.classList.contains("open");
      document.querySelectorAll(".accordion-header").forEach((b) => b.classList.remove("open"));
      document.querySelectorAll(".accordion-content").forEach((c) => (c.style.maxHeight = null));
      if (!isOpen && content) {
        button.classList.add("open");
        content.style.maxHeight = `${content.scrollHeight}px`;
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

  const slides = document.querySelectorAll(".testimonial-card");
  if (slides.length > 1) {
    let i = 0;
    const showSlide = () => {
      if (window.innerWidth >= 768) return;
      slides.forEach((slide, idx) => (slide.style.display = idx === i ? "block" : "none"));
    };
    showSlide();
    setInterval(() => {
      i = (i + 1) % slides.length;
      showSlide();
    }, 3000);
    window.addEventListener("resize", showSlide);
  }
});
