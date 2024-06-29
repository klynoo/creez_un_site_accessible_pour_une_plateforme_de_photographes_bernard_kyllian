import { Media } from "../model/media.ts";
import {
  SimpleElementCreator,
  InnerHTMLManager,
  DOMBuilder,
} from "../lib/domBuilder";

const creator = new SimpleElementCreator();
const contentManager = new InnerHTMLManager();
const builder = new DOMBuilder(creator, contentManager);
let idCounter = 0;

export function mediaTemplate(data: Media) {
  const { title, image, video } = data;
  const mediaPath = video
    ? `src/assets/media/${video}`
    : `src/assets/Sharp/media/${image}`;

  function getUserCardDOM(): HTMLElement {
    const id = `media-${idCounter++}`;
    const mediaElement = video
      ? document.createElement("video")
      : document.createElement("img");

    mediaElement.setAttribute("src", mediaPath);
    mediaElement.setAttribute("alt", title);
    mediaElement.setAttribute("tabindex", "0");
    mediaElement.setAttribute("role", "button");
    mediaElement.className = "img lazy";
    mediaElement.id = id;

    if (video) {
      mediaElement.setAttribute("aria-label", title);
    }

    const article = document.createElement("article");
    article.className = `pictures`;
    const mediaContainer = builder.buildAndAppend(article, "div", "", "", [
      "media-container",
    ]);
    mediaContainer.appendChild(mediaElement);

    builder.buildAndAppend(article, "h2", title, "", ["figure-title"]);

    createLikeButton(article, data);

    return article;
  }

  function createLikeButton(article: HTMLElement, media: Media) {
    const likeWrapper = document.createElement("div");
    likeWrapper.className = "likeWrapper";

    const heartContainer = document.createElement("button");
    heartContainer.className = "likeButton";
    heartContainer.setAttribute("data-id", media.id.toString());
    const heartIcon = document.createElement("i");
    heartIcon.className = "far fa-heart";
    heartContainer.appendChild(heartIcon);
    const likeCountDiv = document.createElement("div");
    likeCountDiv.className = "likeCount";
    likeCountDiv.setAttribute("data-id", media.id.toString());
    likeCountDiv.textContent = media.likes.toString();

    likeWrapper.appendChild(heartContainer);
    likeWrapper.appendChild(likeCountDiv);

    article.appendChild(likeWrapper);
  }

  return { title, mediaPath, getUserCardDOM };
}
