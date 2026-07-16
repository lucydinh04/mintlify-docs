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

(function initTimelineObserver() {
  const init = () => {
    const track = document.querySelector('.aha-history-track-vertical');
    if (!track) return;
    
    // Prevent multiple initializations
    if (track.dataset.initialized) return;
    track.dataset.initialized = 'true';

    const items = document.querySelectorAll('.aha-history-item-vertical');
    const btnPrev = document.querySelector('.aha-nav-btn.prev');
    const btnNext = document.querySelector('.aha-nav-btn.next');
    
    let activeIndex = -1;

    const observer = new IntersectionObserver((entries) => {
      let maxRatio = 0;
      let targetItem = null;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          targetItem = entry.target;
        }
      });
      
      if (targetItem) {
        items.forEach(el => el.classList.remove('active'));
        targetItem.classList.add('active');
        activeIndex = Array.from(items).indexOf(targetItem);
        updateButtons();
      }
    }, { rootMargin: '-20% 0px -40% 0px', threshold: [0.1, 0.5, 0.9] });

    items.forEach(item => observer.observe(item));

    const updateButtons = () => {
      if (!btnPrev || !btnNext) return;
      btnPrev.disabled = activeIndex <= 0;
      btnNext.disabled = activeIndex >= items.length - 1 || activeIndex === -1;
    };
    
    // Fallback if observer is slow
    if (items.length > 0 && activeIndex === -1) {
      items[0].classList.add('active');
      activeIndex = 0;
      updateButtons();
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (activeIndex > 0) {
          const target = items[activeIndex - 1];
          const offset = 120; // Scroll offset for sticky headers
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (activeIndex < items.length - 1) {
          const target = items[activeIndex + 1];
          const offset = 120; // Scroll offset for sticky headers
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  setInterval(init, 500);
})();

(function initGlossaryFilter() {
  const init = () => {
    const input = document.getElementById('aha-glossary-search');
    if (!input || input.dataset.initialized) return;
    input.dataset.initialized = 'true';

    const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

    input.addEventListener('input', () => {
      const q = normalize(input.value.trim());
      const tables = document.querySelectorAll('table');
      tables.forEach(table => {
        let visibleRows = 0;
        table.querySelectorAll('tbody tr').forEach(row => {
          const match = !q || normalize(row.textContent).includes(q);
          row.style.display = match ? '' : 'none';
          if (match) visibleRows++;
        });
        // Hide entire table + its preceding heading if empty
        const heading = table.previousElementSibling;
        const hide = q && visibleRows === 0;
        table.style.display = hide ? 'none' : '';
        if (heading && /^H[2-4]$/.test(heading.tagName)) {
          heading.style.display = hide ? 'none' : '';
        }
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  setInterval(init, 800);
})();

(function injectFloatingAssistant() {
  const BUTTON_ID = 'aha-ai-fab';
  const HREF = '/help-center/ask-ahamove-ai';

  const inject = () => {
    if (document.getElementById(BUTTON_ID)) return;

    const fab = document.createElement('a');
    fab.id = BUTTON_ID;
    fab.href = HREF;
    fab.className = 'aha-floating-assistant';
    fab.setAttribute('aria-label', 'Ask AI AhaAssistant');
    fab.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2a8 8 0 0 1 8 8c0 5.25-8 12-8 12S4 15.25 4 10a8 8 0 0 1 8-8z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      <span class="aha-fab-label">Ask AI AhaAssistant</span>
    `;
    document.body.appendChild(fab);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
  // Re-inject after SPA navigation
  setInterval(inject, 800);
})();
