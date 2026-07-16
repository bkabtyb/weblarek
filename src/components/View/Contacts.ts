import { Form } from "./Form";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IContactsForm {
  email: string;
  phone: string;
}

export class Contacts extends Form<IContactsForm> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  set email(value: string) {
    const input = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container,
    );

    input.value = value;
  }

  get email(): string {
    const input = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container,
    );

    return input.value;
  }

  set phone(value: string) {
    const input = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container,
    );

    input.value = value;
  }

  get phone(): string {
    const input = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container,
    );

    return input.value;
  }
}
