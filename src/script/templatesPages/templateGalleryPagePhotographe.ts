import { ModelPhotographer } from "../model/photographer";
import {
  SimpleElementCreator,
  InnerHTMLManager,
  DOMBuilder,
} from "../lib/domBuilder";

const creator = new SimpleElementCreator();
const contentManager = new InnerHTMLManager();
const builder = new DOMBuilder(creator, contentManager);

export function photographerTemplate(data: ModelPhotographer) {
  const { name, portrait, city, country, tagline, price } = data;
  const picture = `src/assets/Sharp/photographers/${portrait}`;

  function getUserCardDOM(): HTMLElement {
    // Créer l'élément <img> pour afficher le portrait du photographe
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);
    img.setAttribute("tabindex", "0");

    // Créer l'élément <article> pour contenir les informations du photographe
    const article = document.createElement("article");
    const imgProfile = document.createElement("div");
    imgProfile.className = "imgProfile";
    imgProfile.appendChild(img);
    article.appendChild(imgProfile);

    // Ajouter le nom du photographe à l'article
    builder.buildAndAppend(article, "h2", name, "", ["article-title"]);
    // Ajouter la ville et le pays du photographe à l'article
    builder.buildAndAppend(article, "p", `${city}, ${country}`, "", [
      "location",
    ]);
    // Ajouter la description du photographe à l'article
    builder.buildAndAppend(article, "p", tagline, "", ["tagline"]);
    // Ajouter le bouton "Contactez-moi" à l'article
    const buttonForm = builder.buildAndAppend(
      article,
      "button",
      "Contactez-moi",
      "displayModal",
      ["button-form", "button-primary"]
    );
    buttonForm.setAttribute("aria-haspopup", `dialog`);

    // Récupérer l'élément <div> avec l'id "bottomInfoBar"
    const bottomInfoBar = document.getElementById(
      "bottomInfoBar"
    ) as HTMLElement;
    // Ajouter le prix du photographe à la barre d'informations en bas de la page
    builder.buildAndAppend(
      bottomInfoBar,
      "p",
      `${price.toString()}/jours`,
      "",
      ["bottomInfoBar__price"]
    );

    // Vérifier si l'élément avec l'id "nameForm" existe
    const nameForm = document.getElementById("nameForm");
    if (nameForm) {
      // Ajouter le nom du photographe à l'élément avec l'id "nameForm"
      builder.buildAndAppend(nameForm, "h2", name, "");
    }

    return article;
  }

  return { name, picture, getUserCardDOM };
}
