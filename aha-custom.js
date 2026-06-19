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

(function initGlobalPagination() {
  const init = () => {
    if (document.querySelector('.aha-page-nav-injected')) return;
    
    // Find the native pagination wrapper
    // Mintlify typically uses this specific set of classes for the bottom pagination
    const wrappers = document.querySelectorAll('div.flex.justify-between.border-t');
    let paginationWrapper = null;
    
    for (const w of wrappers) {
      const links = w.querySelectorAll('a');
      if (links.length > 0 && links.length <= 2) {
        paginationWrapper = w;
        break; // Found it
      }
    }
    
    if (!paginationWrapper) return;
    
    const links = paginationWrapper.querySelectorAll('a');
    
    // Hide native wrapper
    paginationWrapper.style.display = 'none';
    
    // Build custom wrapper
    const customNav = document.createElement('div');
    customNav.className = 'aha-page-nav aha-page-nav-injected';
    
    let prevLink = null;
    let nextLink = null;
    
    if (links.length === 2) {
      prevLink = links[0];
      nextLink = links[1];
    } else if (links.length === 1) {
      if (links[0].className.includes('justify-end') || links[0].className.includes('text-right')) {
        nextLink = links[0];
      } else {
        prevLink = links[0];
      }
    }
    
    if (prevLink) {
      const href = prevLink.getAttribute('href');
      let title = prevLink.textContent.replace(/Previous|Quay lại|Next|Tiếp tục/gi, '').trim();
      title = title.replace(/^[<←\s]+|[>→\s]+$/g, '');
      
      const card = document.createElement('a');
      card.className = 'nav-card prev';
      card.href = href;
      card.innerHTML = `
        <span class="nav-label">Quay lại</span>
        <span class="nav-cta">← ${title}</span>
      `;
      customNav.appendChild(card);
    } else {
      const empty = document.createElement('div');
      empty.className = 'nav-card prev empty';
      empty.style.visibility = 'hidden';
      customNav.appendChild(empty);
    }
    
    if (nextLink) {
      const href = nextLink.getAttribute('href');
      let title = nextLink.textContent.replace(/Previous|Quay lại|Next|Tiếp tục/gi, '').trim();
      title = title.replace(/^[<←\s]+|[>→\s]+$/g, '');
      
      const card = document.createElement('a');
      card.className = 'nav-card next';
      card.href = href;
      card.innerHTML = `
        <span class="nav-label">Tiếp tục</span>
        <span class="nav-cta">${title} →</span>
      `;
      customNav.appendChild(card);
    } else {
      const empty = document.createElement('div');
      empty.className = 'nav-card next empty';
      empty.style.visibility = 'hidden';
      customNav.appendChild(empty);
    }
    
    paginationWrapper.parentNode.insertBefore(customNav, paginationWrapper);
  };
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  setInterval(init, 500);
})();

// Force Light Mode across the entire site without flashing
(function interceptDarkMode() {
  // Clear any existing dark mode preference in LocalStorage
  try {
    localStorage.setItem('theme', 'light');
    localStorage.setItem('mintlify-theme', 'light');
  } catch(e) {}

  // Override cookies to prevent SSR sending dark HTML on hard refresh
  const cookieOptions = "path=/; max-age=31536000";
  document.cookie = "theme=light; " + cookieOptions;
  document.cookie = "mintlify-theme=light; " + cookieOptions;
  document.cookie = "color-theme=light; " + cookieOptions;
  document.cookie = "next-theme=light; " + cookieOptions;

  // 1. Intercept classList.add
  const originalAdd = DOMTokenList.prototype.add;
  DOMTokenList.prototype.add = function(...args) {
    if (this === document.documentElement.classList && args.includes('dark')) {
      const filtered = args.filter(c => c !== 'dark');
      if (filtered.length > 0) originalAdd.apply(this, filtered);
      return;
    }
    originalAdd.apply(this, args);
  };

  // 2. Intercept setAttribute('class', ...)
  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(name, value) {
    if (this === document.documentElement && name === 'class' && typeof value === 'string') {
      value = value.replace(/\bdark\b/g, '').replace(/\s+/g, ' ').trim();
    }
    originalSetAttribute.call(this, name, value);
  };

  // 3. Remove immediately if already present
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
  }

  // 4. Inject CSS to completely hide theme toggle buttons (footer and navbar)
  const style = document.createElement('style');
  style.innerHTML = `
    /* Hide the theme toggle group in Mintlify */
    .flex.items-center.space-x-1.rounded-full { display: none !important; }
    /* Fallback for buttons with specific icons */
    button:has(svg.lucide-moon), 
    button:has(svg.lucide-sun), 
    button:has(svg.lucide-monitor) { display: none !important; }
    /* Hide the parent wrapper of the toggle if possible */
    div:has(> button:has(svg.lucide-moon)) { display: none !important; }
  `;
  if (document.head) {
    document.head.appendChild(style);
  } else {
    document.addEventListener("DOMContentLoaded", () => document.head.appendChild(style));
  }
})();
