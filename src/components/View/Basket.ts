import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IBasketView {
  items: HTMLElement[];
  total: number;
}

export class BasketView extends Component<IBasketView> {
  protected listElement: HTMLElement;
  protected totalElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.listElement = ensureElement(".basket__list", container);

    this.totalElement = ensureElement(".basket__price", container);

    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".basket__button",
      container,
    );

    this.buttonElement.addEventListener("click", () => {
      this.events.emit("order:open");
    });
  }

  set items(value: HTMLElement[]) {
    this.listElement.replaceChildren(...value);
  }

  set total(value: number) {
    this.setText(this.totalElement, `${value} синапсов`);
  }

  set buttonDisabled(value: boolean) {
    this.setDisabled(this.buttonElement, value);
  }
}
