export interface Validation {
  element: HTMLInputElement;
  validate: () => boolean;
  errorMessage: string;
}

// TODO: Form data :)
const form = document.forms.namedItem("contact") as HTMLFormElement;
const firstName = form["first"] as HTMLInputElement;
const lastName = form["last"] as HTMLInputElement;
const email = form["email"] as HTMLInputElement;
const text = form["text"] as HTMLInputElement;

export const ListValidations: Validation[] = [
  {
    element: firstName,
    validate: () => /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,}$/.test(firstName.value.trim()),
    errorMessage:
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  },
  {
    element: lastName,
    validate: () => /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,}$/.test(lastName.value.trim()),
    errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  },
  {
    element: email,
    validate: () =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value),
    errorMessage: "L'adresse électronique n'est pas valide.",
  },
  {
    element: text,
    validate: () => /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,}$/.test(text.value.trim()),
    errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du text.",
  },
];
