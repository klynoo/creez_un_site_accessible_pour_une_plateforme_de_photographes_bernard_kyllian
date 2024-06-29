export function animationDropDown() {
  const animatedElement = document.getElementById("expend") as HTMLElement;
  animatedElement.style.animation = "rotateXTo180 0.2s ease-in-out forwards";
}

export function animationDropUp() {
  const animatedElement = document.getElementById("expend") as HTMLElement;
  animatedElement.style.animation = "rotateXTo0 0.2s ease-in-out forwards";
}
