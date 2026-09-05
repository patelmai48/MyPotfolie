/**
 * MAHI PATEL - PORTFOLIO THEME CONTROLLER
 * Handles dark/light theme switching with localStorage persistence & system preference fallback.
 */

(function () {
  const THEME_KEY = 'mahi_portfolio_theme';
  const html = document.documentElement;

  // 1. Determine Initial Theme
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Default is dark mode per design specification
    return 'dark';
  }

  // 2. Apply Theme
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  // Set initial theme immediately before DOM content loads to avoid flash
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  // 3. Initialize Toggle Buttons
  document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle');

    themeToggles.forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
      });
    });
  });
})();
