import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IGallery {
  items: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected galleryElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.galleryElement = ensureElement<HTMLElement>(".gallery", container);
  }

  set items(value: HTMLElement[]) {
    this.galleryElement.replaceChildren(...value);
  }
}
