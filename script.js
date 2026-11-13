(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".site-header");

  // Accessible mobile navigation.
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  };

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      menuButton.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
      nav.classList.toggle("open", !expanded);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Header depth on scroll.
  const updateHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // Highlight the navigation item for the section currently in view.
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-38% 0px -52% 0px", threshold: 0 });
    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  // Subtle entrance motion, disabled automatically for reduced-motion users.
  const revealTargets = document.querySelectorAll(
    ".countdown-card, .value-item, .about-photo-wrap, .about-copy, .about-values article, .schedule-item, .quote-band blockquote, .donate-card, .contact-inner, .highlight-strip article"
  );
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTargets.forEach((element) => element.classList.add("reveal"));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  // Footer year.
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Ganesh Chaturthi countdown: 4 September 2027, 00:00 IST.
  const targetTime = new Date("2027-09-04T00:00:00+05:30").getTime();
  const fields = {
    days: document.querySelector("#countdown-days"),
    hours: document.querySelector("#countdown-hours"),
    minutes: document.querySelector("#countdown-minutes"),
    seconds: document.querySelector("#countdown-seconds")
  };
  const message = document.querySelector("#countdown-message");

  const updateCountdown = () => {
    if (Object.values(fields).some((field) => !field)) return;
    const remaining = targetTime - Date.now();

    if (remaining <= 0) {
      Object.values(fields).forEach((field) => { field.textContent = "00"; });
      if (message) message.textContent = "Ganesh Chaturthi is here! Ganpati Bappa Morya!";
      return;
    }

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    fields.days.textContent = String(days).padStart(3, "0");
    fields.hours.textContent = String(hours).padStart(2, "0");
    fields.minutes.textContent = String(minutes).padStart(2, "0");
    fields.seconds.textContent = String(seconds).padStart(2, "0");
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
