import { Modal } from "../../../lib/modal";
import { Validation } from "./conditionValidation";

type ErrorCallback = (element: HTMLElement, errorMessage: string) => void;

export function handleFormSubmission(
  e: Event,
  showError: ErrorCallback,
  ListValidations: Validation[],
  modalform: Modal
): void {
  const errors = document.querySelectorAll("span.error");
  console.log("Beginning error cleanup...");
  errors.forEach((error: Element, index: number) => {
    error.remove();
    console.log(`Removed error ${index + 1}`);
  });
  e.preventDefault();
  console.log("Default form submission prevented.");

  let errorFound = false;

  console.log("Starting validation checks...");
  ListValidations.forEach((validation: Validation, index: number) => {
    console.log(`Validating: ${index + 1}`);
    if (!validation.validate()) {
      const { element, errorMessage } = validation;
      showError(element, errorMessage);
      errorFound = true;
      console.log(`Error found at validation ${index + 1}: ${errorMessage}`);
    }
  });

  if (!errorFound) {
    console.log("No validation errors found, closing modal...");
    modalform.close();
    console.log("Modal closed.");
    if (e.target instanceof HTMLFormElement) {
      e.target.reset();
      console.log("Form reset.");
    }
    console.log("Form submission successful.");
  } else {
    console.log("Submission failed due to validation errors.");
  }
}
