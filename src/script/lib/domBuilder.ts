export interface HTMLElementCreator {
  createElement(tagName: string, id?: string, classes?: string[]): HTMLElement;
}

export class SimpleElementCreator implements HTMLElementCreator {
  createElement(
    tagName: string,
    id: string = "",
    classes: string[] = []
  ): HTMLElement {
    const element = document.createElement(tagName);
    if (id) element.id = id;
    classes.forEach((cls) => element.classList.add(cls));
    return element;
  }
}

export interface ContentManager {
  setContent(element: HTMLElement, content: string): void;
}

export class InnerHTMLManager implements ContentManager {
  setContent(element: HTMLElement, content: string): void {
    element.innerHTML = content;
  }
}

export class DOMBuilder {
  private elementCreator: HTMLElementCreator;
  private contentManager: ContentManager;

  constructor(
    elementCreator: HTMLElementCreator,
    contentManager: ContentManager
  ) {
    this.elementCreator = elementCreator;
    this.contentManager = contentManager;
  }

  buildAndAppend(
    parent: HTMLElement,
    tagName: string,
    content: string,
    id?: string,
    classes?: string[]
  ): HTMLElement {
    const element = this.elementCreator.createElement(tagName, id, classes);
    this.contentManager.setContent(element, content);
    parent.appendChild(element);
    return element;
  }
}
