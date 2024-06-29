export function lazyLoadMedia() {
  // Sélectionner à la fois les images et vidéos avec la classe 'lazy'
  const lazyMedia = document.querySelectorAll(
    "img.lazy, video.lazy"
  ) as NodeListOf<HTMLImageElement | HTMLVideoElement>;

  if ("IntersectionObserver" in window) {
    const lazyMediaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const media = entry.target as HTMLImageElement | HTMLVideoElement;
          if (media.dataset.src) {
            media.src = media.dataset.src;
            media.removeAttribute("data-src"); // Supprimer 'data-src' après chargement
          }
          if (
            media instanceof HTMLVideoElement &&
            media.hasAttribute("data-poster")
          ) {
            media.poster = media.getAttribute("data-poster")!;
            media.removeAttribute("data-poster");
          }
          media.classList.remove("lazy");
          lazyMediaObserver.unobserve(media);
        }
      });
    });

    lazyMedia.forEach((media: HTMLImageElement | HTMLVideoElement) => {
      lazyMediaObserver.observe(media);
    });
  } else {
    let lazyLoadThrottleTimeout: number | undefined;
    function lazyLoad() {
      if (lazyLoadThrottleTimeout) {
        clearTimeout(lazyLoadThrottleTimeout);
      }

      lazyLoadThrottleTimeout = window.setTimeout(() => {
        const scrollTop = window.pageYOffset;
        lazyMedia.forEach((media: HTMLImageElement | HTMLVideoElement) => {
          if (media.offsetTop < window.innerHeight + scrollTop) {
            if (media.dataset.src) {
              media.src = media.dataset.src;
              media.removeAttribute("data-src");
            }
            if (
              media instanceof HTMLVideoElement &&
              media.hasAttribute("data-poster")
            ) {
              media.poster = media.getAttribute("data-poster")!;
              media.removeAttribute("data-poster");
            }
            media.classList.remove("lazy");
          }
        });
        if (lazyMedia.length === 0) {
          document.removeEventListener("scroll", lazyLoad);
          window.removeEventListener("resize", lazyLoad);
          window.removeEventListener("orientationchange", lazyLoad);
        }
      }, 100); // Ajusté à 100 ms pour une meilleure performance
    }

    document.addEventListener("scroll", lazyLoad);
    (window as Window).addEventListener("resize", lazyLoad);
    (window as Window).addEventListener("orientationchange", lazyLoad);
  }
}
