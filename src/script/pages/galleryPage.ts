import { getPhotographersData, getMediaData } from "../api/api";
import { photographerTemplate } from "../templatesPages/templateGalleryPagePhotographe";
import { mediaTemplate } from "../templatesPages/templateGalleryPageMedia";
import { ModelPhotographer } from "../model/photographer";
import { Media } from "../model/media";
// import { lazyLoadMedia } from "../lazyLoading";
import { initLikeCounter, setupLikeButtons } from "../components/like";
import { handleFormSubmission } from "../utils/form/contactForm/main";
import { showError } from "../utils/form/contactForm/templateError";
import { ListValidations } from "../utils/form/contactForm/conditionValidation";
import { Modal } from "../lib/modal";
import { managementDropdown } from "../components/dropdown/dropdownMain";
import { ModalMedia } from "../components/modalMedia";
import { TriTableau } from "../components/dropdown/dropDownUI";

// Initialisation du formulaire
function initForm(): void {
  const contactForm = new Modal(
    "#contact-modal",
    "#displayModal",
    "#closeModal"
  );

  // Gestion des formulaires
  const form = document.getElementById("contact") as HTMLFormElement;
  if (form) {
    form.addEventListener("submit", function (e: Event) {
      handleFormSubmission(e, showError, ListValidations, contactForm);
    });
  }
}

// Affichage du profil du photographe
async function displayData(photographers: ModelPhotographer[]): Promise<void> {
  const photographersSection = document.getElementById("photographer_section");
  if (!photographersSection) {
    console.error("Section des photographes non trouvée");
    return;
  }
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const photographer = photographers.find((p) => p.id.toString() === id);
  if (!photographer) {
    console.error("Photographe non trouvé");
    return;
  }
  const photographerModel = photographerTemplate(photographer);
  photographersSection.appendChild(photographerModel.getUserCardDOM());
}

// Affichage des médias du photographe
async function displayMedia(media: Media[]): Promise<void> {
  const mediaItemModelFigure = document.getElementById("figure");
  if (!mediaItemModelFigure) {
    console.error("Section des médias non trouvée");
    return;
  }
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const filteredMedia = media.filter((m) => m.photographerId.toString() === id);
  if (filteredMedia.length === 0) {
    console.error("Aucun média trouvé pour ce photographe");
    return;
  }
  mediaItemModelFigure.innerHTML = "";
  filteredMedia.forEach((mediaItem) => {
    const mediaItemModel = mediaTemplate(mediaItem);
    mediaItemModelFigure.appendChild(mediaItemModel.getUserCardDOM());
  });
  // lazyLoadMedia();
  setupLikeButtons();
  ModalMedia();
  initLikeCounter();
}

// Initialisation des boutons de tri
function initSortButtons(mediaData: Media[]): void {
  const popularityButton = document.getElementById("popularity");
  const dateButton = document.getElementById("date");
  const titleButton = document.getElementById("title");

  if (!popularityButton || !dateButton || !titleButton) {
    console.error("Boutons de tri non trouvés");
    return;
  }

  if (popularityButton) {
    popularityButton.addEventListener("click", () => {
      console.log("Bouton de tri par popularité cliqué");
      const sortedMedia = new TriTableau(mediaData).trier("popularity");
      displayMedia(sortedMedia);
    });
  }

  if (dateButton) {
    dateButton.addEventListener("click", () => {
      console.log("Bouton de tri par date cliqué");
      const sortedMedia = new TriTableau(mediaData).trier("date");
      displayMedia(sortedMedia);

      console.log("Bouton de tri par date cliqué");
    });
  }

  if (titleButton) {
    titleButton.addEventListener("click", () => {
      console.log("Bouton de tri par titre cliqué");
      const sortedMedia = new TriTableau(mediaData).trier("title");
      displayMedia(sortedMedia);
    });
  }
}

// Initialisation de la page
async function init(): Promise<void> {
  try {
    const photographersData = await getPhotographersData();
    await displayData(photographersData);
    initForm();

    const mediaData = await getMediaData();
    await displayMedia(mediaData);
    managementDropdown();

    initSortButtons(mediaData);
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation des données des photographes et des médias",
      error
    );
  }
}

init();
