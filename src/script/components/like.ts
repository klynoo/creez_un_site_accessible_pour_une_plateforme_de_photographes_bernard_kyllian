// likesManager.ts
export function updateIcon(button: HTMLElement, isLiked: boolean): void {
  const icon: HTMLElement | null = button.querySelector("i");
  if (icon) {
    icon.className = isLiked ? "fas fa-heart" : "far fa-heart";
    console.log(`Icon updated to ${icon.className}`);
  } else {
    console.log("Icon element not found in the button.");
  }
}

export function setupLikeButtons(): void {
  const likeButtons = document.querySelectorAll(".likeButton");
  console.log(`Found ${likeButtons.length} like buttons on the page.`);

  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const btn = event.currentTarget as HTMLElement;
      const dataId = btn.getAttribute("data-id");
      const likesCounter = document.querySelector(
        `div.likeCount[data-id="${dataId}"]`
      ) as HTMLElement;
      let likes = parseInt(likesCounter.textContent || "0", 10);
      const isLiked = btn.classList.contains("liked");

      if (isLiked) {
        likes--;
        console.log(`Like removed. Total likes: ${likes}`);
      } else {
        likes++;
        console.log(`Like added. Total likes: ${likes}`);
      }

      likesCounter.textContent = likes.toString();
      btn.classList.toggle("liked");
      updateIcon(btn, !isLiked);
      initLikeCounter();

      console.log(
        `Button state updated: ${
          btn.classList.contains("liked") ? "Liked" : "Unliked"
        }`
      );
    });
  });
}

let totalLike = 0;

export function initLikeCounter() {
  const likeCounts = document.querySelectorAll(".likeCount");

  const containerNumberLikes = document.getElementById(
    "bottomInfoBarLikeCounter"
  );

  if (!likeCounts.length || !containerNumberLikes) {
    throw new Error(
      "Élément(s) nécessaire(s) pour le compteur de likes introuvable(s)."
    );
  }
  totalLike = 0;

  likeCounts.forEach((like) => {
    const likeNumber = parseInt(like.textContent || "0", 10);
    totalLike += likeNumber;
  });

  containerNumberLikes.innerHTML = `${totalLike.toString()} <i class="fa-solid fa-heart"></i>`;
}
