import { CONFIG } from './config.js';

const STORAGE_KEY = 'vibecode_last_submit';

/**
 * @param {Record<string, string>} fields
 * @returns {{ valid: boolean; errors: Record<string, string> }}
 */
export function validateContactForm(fields) {
  const errors = {};
  const name = (fields.name || '').trim();
  const email = (fields.email || '').trim();
  const message = (fields.message || '').trim();

  if (name.length < 2) errors.name = 'Укажите имя (минимум 2 символа)';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Введите корректный email';

  if (message.length < CONFIG.minMessageLength) {
    errors.message = `Сообщение от ${CONFIG.minMessageLength} символов`;
  }
  if (message.length > CONFIG.maxMessageLength) {
    errors.message = `Не более ${CONFIG.maxMessageLength} символов`;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/** @returns {boolean} */
export function isRateLimited() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const last = Number(raw);
    return Date.now() - last < CONFIG.rateLimitMs;
  } catch {
    return false;
  }
}

export function markSubmitted() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* private mode */
  }
}

/**
 * @param {Record<string, string>} fields
 * @returns {Promise<{ ok: boolean; message: string }>}
 */
export async function submitToWeb3Forms(fields) {
  if (!CONFIG.accessKey) {
    return {
      ok: false,
      message: 'Не настроен VITE_WEB3FORMS_ACCESS_KEY. См. .env.example',
    };
  }

  if (isRateLimited()) {
    return {
      ok: false,
      message: 'Подождите минуту перед повторной отправкой.',
    };
  }

  const validation = validateContactForm(fields);
  if (!validation.valid) {
    return { ok: false, message: 'Проверьте поля формы.', errors: validation.errors };
  }

  const body = new FormData();
  body.append('access_key', CONFIG.accessKey);
  body.append('subject', CONFIG.formSubject);
  body.append('from_name', fields.name.trim());
  body.append('email', fields.email.trim());
  body.append('message', fields.message.trim());
  body.append('botcheck', '');
  if (fields.phone?.trim()) body.append('phone', fields.phone.trim());

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await fetch(CONFIG.web3formsEndpoint, {
      method: 'POST',
      body,
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.success === false) {
      return {
        ok: false,
        message: data.message || 'Сервер отклонил заявку. Попробуйте позже.',
      };
    }

    markSubmitted();
    return { ok: true, message: 'Заявка отправлена! Отвечу в течение 24 часов.' };
  } catch (err) {
    const msg =
      err instanceof Error && err.name === 'AbortError'
        ? 'Превышено время ожидания. Проверьте сеть.'
        : 'Ошибка сети. Напишите в Telegram.';
    return { ok: false, message: msg };
  } finally {
    clearTimeout(timeout);
  }
}
