import { getPhotographersData } from "../api/api";
import { photographerTemplate } from "../templatesPages/templateHome";
import { ModelPhotographer } from "../model/photographer";

async function displayData(photographers: ModelPhotographer[]): Promise<void> {
  const photographersSection = document.getElementById("photographer_section");
  if (!photographersSection) {
    console.error("Section des photographes non trouvée");
    return;
  }
  photographersSection.innerHTML = "";
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init(): Promise<void> {
  try {
    const photographers = await getPhotographersData();
    await displayData(photographers);
    console.log("Initialisation terminée");
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation des données des photographes",
      error
    );
  }
}

init();
