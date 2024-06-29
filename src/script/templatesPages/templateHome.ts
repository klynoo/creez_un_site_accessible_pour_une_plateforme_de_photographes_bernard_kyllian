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
    const link = document.createElement("a");
    link.href = `photographer.html?id=${data.id}`;
    link.setAttribute("aria-label", `Voir le profil de ${name}`);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);
    img.setAttribute("tabindex", "0");

    const article = document.createElement("article");
    const imgProfile = document.createElement("div");
    imgProfile.className = "imgProfile";
    imgProfile.appendChild(img);
    article.appendChild(imgProfile);

    const nameForm = document.getElementById("nameForm");

    builder.buildAndAppend(article, "h2", name, "", ["article-title"]);
    builder.buildAndAppend(article, "p", `${city}, ${country}`, "", [
      "location",
    ]);
    builder.buildAndAppend(article, "p", tagline, "", ["tagline"]);
    builder.buildAndAppend(article, "p", `${price}€/jour`, "", ["price"]);

    if (nameForm) {
      builder.buildAndAppend(nameForm, "h2", name, "");
    }

    link.appendChild(article);
    return link;
  }

  return { name, picture, getUserCardDOM };
}
