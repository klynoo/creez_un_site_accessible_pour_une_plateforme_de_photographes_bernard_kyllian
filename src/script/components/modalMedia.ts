let imgContainer = document.getElementById(
  "modal-media__img"
) as HTMLElement | null;
let modal = document.getElementById(
  "container-modal-media"
) as HTMLElement | null;
let close = document.getElementById("close-modal-media") as HTMLElement | null;
let lastFocusedElement: Element | null = null;

export function ModalMedia() {
  console.log("openModalMedia");

  if (!imgContainer || !modal || !close) {
    throw new Error("Element not found.");
  }

  // Piège le focus à l'intérieur de la modal
  function trapFocus(element: HTMLElement) {
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    element.addEventListener("keydown", function (e: KeyboardEvent) {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        } else if (
          !e.shiftKey &&
          document.activeElement === lastFocusableElement
        ) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });

    firstFocusableElement.focus();
  }

  // Ouvre la modal et enregistre l'élément focusé
  function openModal() {
    lastFocusedElement = document.activeElement;
    if (modal) {
      modal.style.display = "flex";
      trapFocus(modal);
      document.addEventListener("keydown", handleKeyDown);
    }
  }

  // Ferme la modal et restaure le focus
  function closeModal() {
    if (modal) {
      modal.style.display = "none";
      document.removeEventListener("keydown", handleKeyDown);
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    }
  }

  // Gère les événements clavier
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    } else if (event.key === "ArrowLeft") {
      navigateMedia(-1);
    } else if (event.key === "ArrowRight") {
      navigateMedia(1);
    }
  }

  // Ouvre la modal au clic ou à l'appui sur Entrée
  function openModalOnClickOrEnter(event: Event) {
    let element = event.target as HTMLElement;
    if (
      !element.classList.contains("img") &&
      !element.classList.contains("video")
    )
      return;

    imgContainer!.innerHTML = "";

    let clonedElement: HTMLElement | null = null;
    let title = document.createElement("p");
    title.className = "modal-media__img-title";
    if (element.tagName.toLowerCase() === "img") {
      title.textContent =
        (element as HTMLImageElement).alt || "Default Image Title";
      clonedElement = element.cloneNode(true) as HTMLImageElement;
    } else if (element.tagName.toLowerCase() === "video") {
      title.textContent =
        element.getAttribute("aria-label") || "Default Video Title";
      clonedElement = element.cloneNode(true) as HTMLVideoElement;
      (clonedElement as HTMLVideoElement).controls = true;
    }

    if (clonedElement) {
      imgContainer!.appendChild(clonedElement);
    }
    imgContainer!.appendChild(title);

    openModal();

    const mediaElements = Array.from(
      document.querySelectorAll<HTMLElement>("img.img, video.img")
    );
    currentIndex = mediaElements.indexOf(element);
  }

  let currentIndex: number = 0;

  // Navigue entre les médias
  function navigateMedia(direction: number) {
    const mediaElements = Array.from(
      document.querySelectorAll<HTMLElement>("img.img, video.img")
    );
    currentIndex =
      (currentIndex + direction + mediaElements.length) % mediaElements.length;
    updateModalMedia(currentIndex);
  }

  // Met à jour le contenu de la modal
  function updateModalMedia(index: number) {
    const mediaElements = Array.from(
      document.querySelectorAll<HTMLElement>("img.img, video.img")
    );
    const newMedia = mediaElements[index];
    if (newMedia) {
      imgContainer!.innerHTML = "";
      let title = document.createElement("p");
      title.className = "modal-media__img-title";
      if (newMedia.tagName.toLowerCase() === "img") {
        title.textContent =
          (newMedia as HTMLImageElement).alt ||
          newMedia.getAttribute("aria-label") ||
          "Image/Video";
        let clonedMedia = newMedia.cloneNode(true) as HTMLImageElement;
        imgContainer!.appendChild(clonedMedia);
      } else if (newMedia.tagName.toLowerCase() === "video") {
        title.textContent = newMedia.getAttribute("aria-label") || "Video";
        let clonedMedia = newMedia.cloneNode(true) as HTMLVideoElement;
        clonedMedia.controls = true;
        imgContainer!.appendChild(clonedMedia);
      }
      imgContainer!.appendChild(title);
    }
  }

  document.querySelectorAll(".img, .video").forEach((media) => {
    media.addEventListener("click", openModalOnClickOrEnter);
    media.addEventListener("keydown", function (event: Event) {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === "Enter") {
        openModalOnClickOrEnter(event);
      }
    });
  });

  close?.addEventListener("click", closeModal);

  const prevButton = document.getElementById("prev") as HTMLElement;
  const nextButton = document.getElementById("next") as HTMLElement;

  prevButton?.addEventListener("click", function () {
    navigateMedia(-1);
  });

  nextButton?.addEventListener("click", function () {
    navigateMedia(1);
  });
}
