import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export interface IFormState {
  valid: boolean;
  errors: string;
}

export abstract class Form<T> extends Component<IFormState> {
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(
    protected container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container);

    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      container,
    );

    this.errorsElement = ensureElement<HTMLElement>(".form__errors", container);

    this.container.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;

      this.events.emit("form:change", {
        field: target.name,
        value: target.value,
      });
    });

    this.container.addEventListener("submit", (event) => {
      event.preventDefault();

      this.events.emit("form:submit");
    });
  }

  set valid(value: boolean) {
    this.setDisabled(this.submitButton, !value);
  }

  set errors(value: string) {
    this.setText(this.errorsElement, value);
  }

  reset(): void {
    this.container.reset();

    this.errors = "";

    this.valid = false;
  }
}
