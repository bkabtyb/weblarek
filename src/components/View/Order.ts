import { Form } from "./Form";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { TPayment } from "../../types";

interface IOrderForm {
  payment: TPayment | null;
  address: string;
}

export class Order extends Form<IOrderForm> {
  protected paymentButtons: NodeListOf<HTMLButtonElement>;
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.paymentButtons = container.querySelectorAll<HTMLButtonElement>(
      ".order__buttons .button",
    );

    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      container,
    );

    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.events.emit("payment:select", {
          payment: button.name as TPayment,
        });
      });
    });
  }

  set payment(value: TPayment | null) {
    this.paymentButtons.forEach((button) => {
      button.classList.toggle("button_alt-active", button.name === value);
    });
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}
