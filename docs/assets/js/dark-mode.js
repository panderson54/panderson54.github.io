(function () {
  'use strict';

  var STORAGE_KEY = 'theme';

  var MOON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>';
  var SUN_SVG  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1"  x2="12" y2="3"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1"  y1="12" x2="3"  y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function savePreference(dark) {
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch (e) { /* storage unavailable */ }
  }

  function updateButton(btn, dark) {
    btn.innerHTML = dark ? SUN_SVG : MOON_SVG;
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title',      dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function createToggleButton() {
    var btn = document.createElement('button');
    btn.id        = 'dark-mode-toggle';
    btn.className = 'dark-mode-toggle';
    btn.setAttribute('type', 'button');
    updateButton(btn, isDark());

    btn.addEventListener('click', function () {
      var nowDark = !isDark();
      applyTheme(nowDark);
      savePreference(nowDark);
      updateButton(btn, nowDark);
    });

    return btn;
  }

  function injectButton() {
    // Avoid double-injection
    if (document.getElementById('dark-mode-toggle')) return;

    var btn = createToggleButton();

    // Try to place it in the masthead nav for a natural look
    var navLinks = document.querySelector('.greedy-nav .visible-links');
    var greedyNav = document.querySelector('.greedy-nav');

    if (greedyNav) {
      // Insert after visible-links, before the overflow toggle
      var overflowBtn = greedyNav.querySelector('.greedy-nav__toggle');
      if (overflowBtn) {
        greedyNav.insertBefore(btn, overflowBtn);
      } else {
        greedyNav.appendChild(btn);
      }
      // Trigger greedy-nav to recalculate which links fit now that we've added
      // the toggle button — without this the nav JS sees stale available width
      // and leaves "About" partially visible instead of moving it to the dropdown.
      window.dispatchEvent(new Event('resize'));
    } else {
      // Fallback: float in top-right corner
      btn.style.cssText = 'position:fixed;top:12px;right:12px;z-index:9999;';
      document.body.appendChild(btn);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectButton();

    // Respond to OS-level theme changes when the user has no stored preference
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', function (e) {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches);
          var btn = document.getElementById('dark-mode-toggle');
          if (btn) updateButton(btn, e.matches);
        }
      } catch (err) { /* storage unavailable */ }
    });
  });
})();
