//import Alpine from 'alpinejs';
//import '../css/app.css';

import { navigation } from './modules/navigation.js';
import { contactForm } from './modules/contact-form.js';
import { faqAccordion } from './modules/faq.js';
import { scrollReveal } from './modules/scroll-reveal.js';
import {
  CONFIG,
  NAV_LINKS,
  SERVICES,
  PROJECTS,
  PROCESS_STEPS,
  PRICING,
  FAQ_ITEMS,
} from './modules/config.js';

Alpine.data('navigation', navigation);
Alpine.data('contactForm', contactForm);
Alpine.data('faqAccordion', faqAccordion);
Alpine.data('scrollReveal', scrollReveal);

window.__APP__ = {
  config: CONFIG,
  nav: NAV_LINKS,
  services: SERVICES,
  projects: PROJECTS,
  process: PROCESS_STEPS,
  pricing: PRICING,
  faq: FAQ_ITEMS,
};

window.Alpine = Alpine;
Alpine.start();

document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
});
