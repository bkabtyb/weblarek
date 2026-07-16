import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface ISuccess {
  total: number;
}

export class Success extends Component<ISuccess> {
  protected descriptionElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".order-successdescription",
      container,
    );

    this.closeButton = ensureElement<HTMLButtonElement>(
      ".order-successclose",
      container,
    );

    this.closeButton.addEventListener("click", () => {
      this.events.emit("success:close");
    });
  }

  set total(value: number) {
    this.setText(this.descriptionElement, `Списано ${value} синапсов`);
  }
}
