import { Card } from "./Card";
import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { CDN_URL, categoryMap, TCategory } from "../../../utils/constants";
import { IEvents } from "../../base/Events";

export class ProductCard<T extends Partial<IProduct>> extends Card<T> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      container,
    );

    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      container,
    );
  }

  set image(value: string) {
    this.setImage(this.imageElement, `${CDN_URL}${value}`);
  }

  set category(value: TCategory) {
    this.setText(this.categoryElement, value);

    this.categoryElement.className = `card__category ${categoryMap[value]}`;
  }
}
