/* ==========================================================================
   animate.js — page-wide behaviors shared by home + project pages:
   theme toggle, tmux clock, active-tab tracking, scroll reveals, counters.
   ========================================================================== */
(function () {
  const root = document.documentElement;

  // Flip between dark and light themes and remember the choice (best effort).
  window.toggleTheme = function () {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  };
  const btn = document.getElementById("theme-btn");
  if (btn) btn.addEventListener("click", window.toggleTheme);

  // Live HH:MM clock on the right of the tmux bar (Austin time).
  const clock = document.getElementById("clock");
  function tick() {
    if (!clock) return;
    clock.textContent = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Chicago",
    }) + " CST · austin";
  }
  tick(); setInterval(tick, 15000);

  // Highlight the tmux tab for whichever section is currently on screen.
  const tabs = [...document.querySelectorAll("#tabs a[href^='#']")];
  if (tabs.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        tabs.forEach((t) => t.classList.toggle("active", t.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    tabs.forEach((t) => { const s = document.querySelector(t.getAttribute("href")); if (s) spy.observe(s); });
  }

  // Count a number up from 0 to its target once, easing out.
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || "0", 10);
    const pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    const dur = 1400, t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const v = target * (1 - Math.pow(1 - k, 3));
      el.textContent = pre + v.toFixed(dec) + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Reveal `.reveal` elements and start counters/animations when they scroll into view.
  // Exposed so pages that render content dynamically can re-scan afterwards.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add("in");
      el.querySelectorAll("[data-count]").forEach(countUp);
      if (el.dataset.count) countUp(el);
      el.dispatchEvent(new CustomEvent("revealed"));
      io.unobserve(el);
    });
  }, { threshold: 0.15 });
  window.observeReveals = (scope = document) =>
    scope.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
  window.observeReveals();
})();
