(function initAhamoveCountup() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  let observer = null;
  const init = () => {
    const elements = document.querySelectorAll(".aha-home .aha-countup:not(.aha-counted)");
    if (!elements.length) return;

    if (!observer) {
      observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            animateValue(el);
            obs.unobserve(el);
            el.classList.add("aha-counted");
          }
        });
      }, { threshold: 0.5 });
    }

    elements.forEach(el => observer.observe(el));
  };

  // Run immediately if possible
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Polling to handle Next.js / Mintlify hydration and SPA navigation
  setInterval(init, 500);

  function animateValue(el) {
    const end = parseInt(el.getAttribute("data-count-to"), 10);
    const suffix = el.getAttribute("data-count-suffix") || "";
    const format = el.getAttribute("data-count-format") === "true";
    if (isNaN(end)) return;

    const duration = 1400;
    let startTimestamp = null;

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(easeOutQuart(progress) * end);

      let text = current.toString();
      if (format) {
        text = current.toLocaleString('vi-VN').replace(/,/g, '.');
      }
      el.textContent = text + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        let finalText = end.toString();
        if (format) {
          finalText = end.toLocaleString('vi-VN').replace(/,/g, '.');
        }
        el.textContent = finalText + suffix;
      }
    };
    window.requestAnimationFrame(step);
  }
})();
