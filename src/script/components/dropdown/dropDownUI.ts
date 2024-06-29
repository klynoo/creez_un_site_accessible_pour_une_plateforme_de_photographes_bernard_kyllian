import { Media } from "../../model/media";

export function dropdownUI(dropdownElement: HTMLElement): void {
  const modalDropdown = document.getElementById("dropdownMenu") as HTMLElement;
  if (!modalDropdown) {
    console.error('No element with id "dropdownMenu" found');
    return;
  }

  document.addEventListener("click", (event) => {
    const targetElement = event.target as HTMLElement;
    if (
      targetElement !== dropdownElement &&
      !dropdownElement.contains(targetElement)
    ) {
      modalDropdown.style.display = "none";
    }
  });

  if (modalDropdown.style.display === "flex") {
    modalDropdown.style.display = "none";
  } else {
    modalDropdown.style.display = "flex";
  }
}

interface DropdownElement {
  id: string;
  onClick: () => void;
}

export class DropdownLogic {
  private selectedValue: HTMLElement;
  private elements: DropdownElement[];
  private currentSelectedElement: HTMLElement | null = null;

  constructor(selectedValueId: string, elements: DropdownElement[]) {
    this.selectedValue = document.getElementById(
      selectedValueId
    ) as HTMLElement;

    this.elements = elements;

    if (!this.selectedValue) {
      throw new Error(`No element with id '${selectedValueId}' found`);
    }

    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.elements.forEach((element) => {
      const el = document.getElementById(element.id);
      if (!el) {
        throw new Error(`No element with id '${element.id}' found`);
      }

      el.addEventListener("click", () => {
        this.updateSelectedValue(el);
        element.onClick();
      });
    });
  }

  updateSelectedValue(newSelectedElement: HTMLElement): void {
    if (this.currentSelectedElement) {
      this.currentSelectedElement.style.display = "block";
    }

    newSelectedElement.style.display = "none";

    this.selectedValue.textContent = newSelectedElement.textContent || "";

    this.currentSelectedElement = newSelectedElement;
  }
}

export class TriTableau {
  private articles: Media[];

  constructor(articles: Media[]) {
    this.articles = articles;
  }
  trier(critere: "popularity" | "date" | "title"): Media[] {
    console.log(`Tri par critère : ${critere}`);
    switch (critere) {
      case "popularity":
        console.log("Tri par popularité");
        return this.articles.sort((a, b) => b.likes - a.likes);
      case "date":
        console.log("Tri par date");
        return this.articles.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

      case "title":
        console.log("Tri par titre");
        return this.articles.sort((a, b) => a.title.localeCompare(b.title));
      default:
        console.error("Critère de tri inconnu");
        return this.articles;
    }
  }
}
