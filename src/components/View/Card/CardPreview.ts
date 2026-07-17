import { ProductCard } from "./ProductCard";
import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

export class CardPreview extends ProductCard<Partial<IProduct>> {
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    events: IEvents,
    protected onButtonClick: () => void,
  ) {
    super(container, events);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      container,
    );

    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      container,
    );

    this.buttonElement.addEventListener("click", () => {
      this.onButtonClick();
    });
  }

  set description(value: string) {
    this.setText(this.descriptionElement, value);
  }

  set buttonText(value: string) {
    this.setText(this.buttonElement, value);
  }

  set disabled(value: boolean) {
    this.setDisabled(this.buttonElement, value);
  }
}
