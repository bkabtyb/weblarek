import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types";
import { IEvents } from "../../base/Events";

export class Card<T extends Partial<IProduct>> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>(".card__title", container);

    this.priceElement = ensureElement<HTMLElement>(".card__price", container);
  }

  set title(value: string) {
    this.setText(this.titleElement, value);
  }

  set price(value: number | null) {
    this.setText(
      this.priceElement,
      value === null ? "Бесценно" : `${value} синапсов`,
    );
  }
}
