import { NAV_LINKS } from './config.js';

export function navigation() {
  return {
    open: false,
    activeSection: 'hero',
    links: NAV_LINKS,

    init() {
      this.observeSections();
      window.addEventListener('scroll', () => this.updateActive(), { passive: true });
    },

    observeSections() {
      const ids = ['hero', ...NAV_LINKS.map((l) => l.id)];
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id) {
              this.activeSection = entry.target.id;
            }
          });
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    },

    updateActive() {
      const offset = 120;
      let current = 'hero';

      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }

      this.activeSection = current;
    },

    isActive(id) {
      return this.activeSection === id;
    },

    closeMenu() {
      this.open = false;
    },

    toggleMenu() {
      this.open = !this.open;
    },
  };
}
