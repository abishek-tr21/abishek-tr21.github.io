/* ═══════════════════════════════════════════════════════════════════════════════
   script.js — Portfolio Interactions
   1. Scroll reveal (IntersectionObserver)
   2. Active nav state tracking
   3. Auto-hiding top nav on scroll down
   ═══════════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ─── 1. Scroll Reveal (IntersectionObserver) ───────────────────────────────
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // ─── 2. Active Navigation State Tracking ──────────────────────────────────
  const sections = document.querySelectorAll("section[id]");
  const topNavLinks = document.querySelectorAll(".nav-links a[data-nav]");
  const bottomNavItems = document.querySelectorAll(".bottom-nav-item[data-nav]");

  function updateActiveNav() {
    let current = "home";
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop) {
        current = section.id;
      }
    });

    // Map section ids to nav data attributes
    const navMap = {
      home: "home",
      hero: "home",
      about: "about",
      skills: "skills",
      projects: "projects",
      education: "education",
      contact: "contact",
    };
    const activeNav = navMap[current] || current;

    topNavLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === activeNav);
    });

    bottomNavItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.nav === activeNav);
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // ─── 3. Auto-Hide Top Nav on Scroll Down ──────────────────────────────────
  let lastScrollY = 0;
  const topNav = document.getElementById("topNav");

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 200 && currentScrollY > lastScrollY) {
        topNav.classList.add("nav-hidden");
      } else {
        topNav.classList.remove("nav-hidden");
      }
      lastScrollY = currentScrollY;
    },
    { passive: true }
  );

  // ─── 4. Smooth scroll for bottom nav (iOS bounce fix) ─────────────────────
  document.querySelectorAll(".bottom-nav-item, .nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // ─── 5. Theme Toggle ────────────────────────────────────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#121212');
  }

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#121212' : '#FAF6F0');
    }
  });

})();
