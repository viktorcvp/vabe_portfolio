export function scrollReveal() {
  return {
    init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('[data-reveal]').forEach((el) => {
          el.classList.remove('reveal-hidden');
          el.classList.add('reveal-visible');
        });
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove('reveal-hidden');
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    },
  };
}
