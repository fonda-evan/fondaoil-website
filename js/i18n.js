/**
 * Fonda Oil — i18n Engine
 * Supports: zh, en, ru
 */
(function() {
  'use strict';

  var SUPPORTED = ['zh', 'en', 'ru'];
  var _lang = 'zh';

  // Detect initial language
  function detect() {
    // 1. localStorage
    try {
      var saved = localStorage.getItem('fonda-lang');
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch(e) {}
    // 2. browser preference
    var navLang = (navigator.language || '').split('-')[0];
    if (SUPPORTED.indexOf(navLang) !== -1) return navLang;
    // 3. default zh
    return 'zh';
  }

  _lang = detect();

  window.setLang = function(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    _lang = lang;
    try { localStorage.setItem('fonda-lang', lang); } catch(e) {}
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ru' ? 'ru-RU' : 'en-US';
    applyI18n();
    updateLangSwitcher();
  };

  window.getLang = function() { return _lang; };

  window.t = function(key) {
    var entry = (window.I18N_DATA || {})[key];
    if (!entry) return key;
    return entry[_lang] || entry['zh'] || key;
  };

  function applyI18n() {
    // Text content
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute('data-i18n');
      var text = window.t(key);
      if (text && text !== key) {
        el.textContent = text;
      }
    }
    // Placeholders
    var phEls = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < phEls.length; j++) {
      var phEl = phEls[j];
      var phKey = phEl.getAttribute('data-i18n-placeholder');
      var phText = window.t(phKey);
      if (phText && phText !== phKey) {
        phEl.placeholder = phText;
      }
    }
    // Call site-specific hooks
    if (typeof window.onLangChange === 'function') {
      window.onLangChange(_lang);
    }
  }

  function updateLangSwitcher() {
    var btns = document.querySelectorAll('.lang-option');
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      var l = btn.getAttribute('data-lang');
      if (l === _lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  }

  // Initial application
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      document.documentElement.lang = _lang === 'zh' ? 'zh-CN' : _lang === 'ru' ? 'ru-RU' : 'en-US';
      applyI18n();
      updateLangSwitcher();
    });
  } else {
    document.documentElement.lang = _lang === 'zh' ? 'zh-CN' : _lang === 'ru' ? 'ru-RU' : 'en-US';
    applyI18n();
    updateLangSwitcher();
  }
})();
