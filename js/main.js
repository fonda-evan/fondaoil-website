/* ============================================
   峰达石油设备 Fonda Oil — 交互脚本
   ============================================ */

(function () {
  'use strict';

  // === NAV SCROLL ===
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // === MOBILE NAV TOGGLE ===
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // === BACK TO TOP ===
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('visible', window.scrollY > 500);
    });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === ACTIVE NAV LINK ===
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && (href === './' || href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // === PRODUCT FILTER ===
  function applyFilter(cat) {
    document.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.remove('active');
      if (b.dataset.category === cat) b.classList.add('active');
    });
    document.querySelectorAll('.product-card').forEach(function (card) {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.dataset.category);
    });
  });

  // Apply filter from URL param
  var urlParams = new URLSearchParams(window.location.search);
  var catParam = urlParams.get('cat');
  if (catParam) applyFilter(catParam);

  // === CONTACT FORM ===
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.form-submit');
      var origText = btn.textContent;
      btn.textContent = '提交中...';
      btn.disabled = true;

      // 模拟提交
      setTimeout(function () {
        btn.textContent = '✓ 提交成功！我们会尽快联系您';
        btn.style.background = '#2D8C4A';
        contactForm.reset();

        setTimeout(function () {
          btn.textContent = origText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 800);
    });
  }

  // === SCROLL REVEAL (simple) ===
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // === LANGUAGE SWITCHER ===
  var langBtn = document.querySelector('.lang-btn');
  var langSwitcher = document.querySelector('.lang-switcher');
  if (langBtn && langSwitcher) {
    langBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      langSwitcher.classList.toggle('open');
    });
    document.querySelectorAll('.lang-option').forEach(function(opt) {
      opt.addEventListener('click', function(e) {
        e.stopPropagation();
        var lang = opt.getAttribute('data-lang');
        if (lang && window.setLang) {
          window.setLang(lang);
        }
        langSwitcher.classList.remove('open');
      });
    });
    document.addEventListener('click', function() {
      langSwitcher.classList.remove('open');
    });
  }

  // === COUNTER ANIMATION ===
  var statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.dataset.count, 10);
          var suffix = el.dataset.suffix || '';
          var duration = 2000;
          var start = performance.now();

          function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            var current = Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = el.dataset.final || (target + suffix);
            }
          }

          requestAnimationFrame(update);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(function (el) { countObserver.observe(el); });
  }

})();
