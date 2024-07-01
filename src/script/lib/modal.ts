export class Modal {
  modal: HTMLElement | null;
  triggers: HTMLElement | null;
  closeButton: HTMLElement | null;
  focusableElements: NodeListOf<HTMLElement> | undefined;
  firstFocusableElement: HTMLElement | undefined;
  lastFocusableElement: HTMLElement | undefined;

  constructor(
    modalSelector: string,
    triggerSelector?: string,
    closeSelector?: string
  ) {
    this.modal = document.querySelector<HTMLElement>(modalSelector);
    this.triggers = triggerSelector
      ? document.querySelector<HTMLElement>(triggerSelector)
      : null;
    this.closeButton = closeSelector
      ? document.querySelector<HTMLElement>(closeSelector)
      : null;
    this.init();
  }

  open(): void {
    if (this.modal) {
      this.modal.style.display = "block";
      this.focusableElements = this.modal.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      this.firstFocusableElement = this.focusableElements[0];
      this.lastFocusableElement =
        this.focusableElements[this.focusableElements.length - 1];
      this.firstFocusableElement?.focus();
      this.lockFocus();
    } else {
      console.log("Attempted to open modal, but no modal element is present.");
    }
  }

  close(): void {
    if (this.modal) {
      this.modal.style.display = "none";
    } else {
      console.log("Attempted to close modal, but no modal element is present.");
    }
  }

  lockFocus(): void {
    this.modal?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === this.firstFocusableElement) {
            e.preventDefault();
            this.lastFocusableElement?.focus();
          }
        } else {
          if (document.activeElement === this.lastFocusableElement) {
            e.preventDefault();
            this.firstFocusableElement?.focus();
          }
        }
      } else if (e.key === "Escape") {
        this.close();
      }
    });
  }

  init(): void {
    this.triggers?.addEventListener("click", () => {
      this.open();
    });

    this.closeButton?.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" && this.modal?.style.display === "block") {
        this.close();
      }
    });
  }
}
