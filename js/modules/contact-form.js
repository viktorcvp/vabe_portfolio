import { submitToWeb3Forms, validateContactForm } from './form-handler.js';
import { CONFIG } from './config.js';

export function contactForm() {
  return {
    status: 'idle',
    statusMessage: '',
    errors: {},
    fields: {
      name: '',
      email: '',
      phone: '',
      message: '',
      website: '',
    },

    get isSubmitting() {
      return this.status === 'submitting';
    },

    get isSuccess() {
      return this.status === 'success';
    },

    validateField(field) {
      const { errors } = validateContactForm(this.fields);
      if (errors[field]) {
        this.errors = { ...this.errors, [field]: errors[field] };
      } else {
        const next = { ...this.errors };
        delete next[field];
        this.errors = next;
      }
    },

    async submit() {
      if (this.fields.website) return;

      this.errors = {};
      this.statusMessage = '';

      const { valid, errors } = validateContactForm(this.fields);
      if (!valid) {
        this.errors = errors;
        this.status = 'error';
        this.statusMessage = 'Исправьте ошибки в форме.';
        return;
      }

      this.status = 'submitting';

      const result = await submitToWeb3Forms(this.fields);

      if (result.errors) this.errors = result.errors;

      if (result.ok) {
        this.status = 'success';
        this.statusMessage = result.message;
        this.fields = { name: '', email: '', phone: '', message: '', website: '' };
      } else {
        this.status = 'error';
        this.statusMessage = result.message;
      }
    },

    get charCount() {
      return (this.fields.message || '').length;
    },

    get charHint() {
      return `${this.charCount} / ${CONFIG.maxMessageLength}`;
    },
  };
}
