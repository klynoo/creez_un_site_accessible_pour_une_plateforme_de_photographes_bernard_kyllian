import { dropdownUI, DropdownLogic } from "./dropDownUI";

// Fonction pour gérer le comportement du menu déroulant
export function managementDropdown(): void {
  const dropdownElement = document.getElementById("dropdownLabel");

  if (!dropdownElement) {
    console.error('Aucun élément avec l\'id "dropdown" trouvé');
    return;
  }

  // Ajouter un écouteur d'événement pour gérer le clic sur le menu déroulant
  dropdownElement.addEventListener("click", () => {
    dropdownUI(dropdownElement);
  });
}

// Créer une nouvelle instance de DropdownLogic
const dropdown = new DropdownLogic("selectedValue", [
  { id: "popularity", onClick: () => {} },
  { id: "date", onClick: () => {} },
  { id: "title", onClick: () => {} },
]);

// Initialiser l'option Popularité comme valeur sélectionnée par défaut
document.addEventListener("DOMContentLoaded", () => {
  const initialSelectedElement = document.getElementById("popularity");
  if (initialSelectedElement) {
    dropdown.updateSelectedValue(initialSelectedElement);
  } else {
    console.warn(
      "Élément sélectionné initial avec l'id 'popularity' non trouvé"
    );
  }
  // Initialisation des boutons de tri
});
