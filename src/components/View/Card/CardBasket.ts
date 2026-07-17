import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types";
import { IEvents } from "../../base/Events";

interface ICardBasket extends Partial<IProduct> {
  index: number;
}

export class CardBasket extends Card<ICardBasket> {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    events: IEvents,
    protected onDelete: () => void,
  ) {
    super(container, events);

    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      container,
    );

    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      container,
    );

    this.deleteButton.addEventListener("click", () => {
      this.onDelete();
    });
  }

  set index(value: number) {
    this.setText(this.indexElement, value);
  }
}
