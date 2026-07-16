import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IModalData {
  content: HTMLElement;
}

export class Modal extends Component<IModalData> {
  protected closeButton: HTMLButtonElement;
  protected content: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      container,
    );

    this.content = ensureElement<HTMLElement>(".modal__content", container);

    this.closeButton.addEventListener("click", () => {
      this.close();
    });

    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });
  }

  set contentElement(value: HTMLElement) {
    this.content.replaceChildren(value);
  }

  open(): void {
    this.container.classList.add("modal_active");

    this.events.emit("modal:open");
  }

  close(): void {
    this.container.classList.remove("modal_active");

    this.content.replaceChildren();

    this.events.emit("modal:close");
  }

  render(data: IModalData): HTMLElement {
    this.contentElement = data.content;

    this.open();

    return this.container;
  }
}
