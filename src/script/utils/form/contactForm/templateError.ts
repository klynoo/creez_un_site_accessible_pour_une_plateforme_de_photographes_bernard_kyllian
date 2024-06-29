export function showError(element: HTMLElement, errorMessage: string): void {
  const formField = element.parentElement as HTMLElement;
  let error = formField.querySelector("span.error") as HTMLSpanElement;

  if (!error) {
    error = document.createElement("span");
    error.className = "error";
    formField.appendChild(error);
    console.log("Span d'erreur créé et ajouté au champ de formulaire :", error);
  }

  error.innerText = errorMessage;
  console.log("Message d'erreur défini :", errorMessage);
}
