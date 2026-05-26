/** @typedef {'idle' | 'submitting' | 'success' | 'error'} FormStatus */

export const CONFIG = {
  siteName: 'VibeCode',
  tagline: 'AI-ускоренная веб-разработка под заказ',
  email: 'hello@vibecode.example',
  telegram: 'https://t.me/your_username',
  web3formsEndpoint: 'https://api.web3forms.com/submit',
  accessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
  formSubject: 'Новая заявка с портфолио VibeCode',
  minMessageLength: 20,
  maxMessageLength: 2000,
  rateLimitMs: 60_000,
};

export const NAV_LINKS = [
  { id: 'services', label: 'Услуги' },
  { id: 'portfolio', label: 'Работы' },
  { id: 'process', label: 'Процесс' },
  { id: 'pricing', label: 'Цены' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Контакт' },
];

export const SERVICES = [
  {
    icon: '⚡',
    title: 'Лендинг под ключ',
    desc: 'Одностраничник с формой, аналитикой и адаптивом. Срок — от 2 дней.',
  },
  {
    icon: '🎨',
    title: 'Визитка / портфолио',
    desc: 'Персональный бренд, кейсы, SEO-база. Идеально для фриланса.',
  },
  {
    icon: '🔧',
    title: 'Доработка сайта',
    desc: 'Секции, скорость, формы, мобильная версия — точечно и быстро.',
  },
];

const base = import.meta.env.BASE_URL;

export const PROJECTS = [
  {
    title: 'Beauty Studio',
    type: 'Лендинг салона',
    stack: 'HTML · Tailwind · Alpine',
    href: `${base}demos/project-beauty-final.html`,
    gradient: 'from-pink-500/20 to-vibe-600/20',
  },
  {
    title: 'FitPulse',
    type: 'Фитнес-клуб',
    stack: 'Vite · Tailwind',
    href: `${base}demos/project-fitness.html`,
    gradient: 'from-glow-lime/20 to-cyan-500/20',
  },
  {
    title: 'Premium Estate',
    type: 'Премиум-недвижимость',
    stack: 'Статика · GSAP-ready',
    href: `${base}demos/project-premium.html`,
    gradient: 'from-amber-500/20 to-vibe-700/20',
  },
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Бриф', text: '15 минут в чате: цель, референсы, сроки и бюджет.' },
  { step: '02', title: 'Прототип', text: 'Структура и вайрфрейм в тот же день — согласуем до кода.' },
  { step: '03', title: 'Вайбкодинг', text: 'AI + ручная полировка: вёрстка, анимации, форма, деплой.' },
  { step: '04', title: 'Сдача', text: 'GitHub Pages, инструкция, 7 дней на мелкие правки.' },
];

export const PRICING = [
  {
    name: 'Старт',
    price: 'от 15 000 ₽',
    features: ['Лендинг до 5 секций', 'Форма + honeypot', 'GitHub Pages', '3 правки'],
    popular: false,
  },
  {
    name: 'Бизнес',
    price: 'от 28 000 ₽',
    features: ['До 8 секций', 'Анимации Alpine', 'SEO-мета + OG', 'Аналитика', '7 правок'],
    popular: true,
  },
  {
    name: 'Под ключ',
    price: 'договор',
    features: ['Несколько страниц', 'Кастомная тема', 'Интеграции', 'Приоритетная поддержка'],
    popular: false,
  },
];

export const FAQ_ITEMS = [
  {
    q: 'Что такое вайбкодинг?',
    a: 'Это разработка с AI-ассистентами: быстрее прототип, чище код, больше времени на UX и ваши правки.',
  },
  {
    q: 'Нужен ли мне хостинг?',
    a: 'Для лендингов достаточно бесплатного GitHub Pages. Домен подключим по инструкции.',
  },
  {
    q: 'Как защищена форма?',
    a: 'Honeypot, лимит отправок на клиенте, валидация Web3Forms и rate-limit на их стороне.',
  },
  {
    q: 'Сколько занимает проект?',
    a: 'Простой лендинг — 2–5 дней. Сложнее — обсудим на брифе.',
  },
];
