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
  protected selectedPayment: TPayment | null = null;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.paymentButtons = container.querySelectorAll(".order__buttons .button");

    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const payment = button.name as TPayment;

        this.paymentButtons.forEach((item) => {
          item.classList.remove("button_alt-active");
        });

        button.classList.add("button_alt-active");

        this.selectedPayment = payment;

        this.events.emit("payment:change", {
          payment,
        });
      });
    });
  }

  set payment(value: TPayment | null) {
    this.selectedPayment = value;

    this.paymentButtons.forEach((button) => {
      button.classList.toggle("button_alt-active", button.name === value);
    });
  }

  get payment(): TPayment | null {
    return this.selectedPayment;
  }

  set address(value: string) {
    const input = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container,
    );

    input.value = value;
  }

  get address(): string {
    const input = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container,
    );

    return input.value;
  }
}
