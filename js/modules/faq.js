export function faqAccordion() {
  return {
    openIndex: 0,

    toggle(index) {
      this.openIndex = this.openIndex === index ? -1 : index;
    },

    isOpen(index) {
      return this.openIndex === index;
    },
  };
}
