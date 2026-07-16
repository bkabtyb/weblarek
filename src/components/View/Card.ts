import { Component } from "../base/Component";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { CDN_URL, categoryMap } from "../../utils/constants";

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ICardBasket extends IProduct{
  index: number
}

export class Card<T extends IProduct> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected categoryElement?: HTMLElement;
  protected imageElement?: HTMLImageElement;
  protected id: string = "";

  constructor(
    container: HTMLElement,
    protected events: IEvents,
    actions?: ICardActions,
  ) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>(".card__title", container);
    this.priceElement = ensureElement<HTMLElement>(".card__price", container);

    this.categoryElement =
      container.querySelector<HTMLElement>(".card__category") ?? undefined;

    this.imageElement =
      container.querySelector<HTMLImageElement>(".card__image") ?? undefined;

    if (actions?.onClick) {
      container.addEventListener("click", actions.onClick);
    }
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

  set category(value: string) {
    if (!this.categoryElement) {
      return;
    }

    this.setText(this.categoryElement, value);

    this.categoryElement.className = "card__category";

    const modifier = categoryMap[value as keyof typeof categoryMap];

    if (modifier) {
      this.categoryElement.classList.add(modifier);
    }
  }

  set image(value: string) {
    if (!this.imageElement) {
      return;
    }

    this.setImage(
      this.imageElement,
      `${CDN_URL}/${value}`,
      this.titleElement.textContent ?? "",
    );
  }
}

/**
 * Карточка каталога
 */
export class CardCatalog extends Card<IProduct> {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.container.addEventListener("click", () => {
      this.events.emit("card:select", {
        id: this.id,
      });
    });
  }
}

/**
 * Карточка предпросмотра
 */
export class CardPreview extends Card<IProduct> {
  protected descriptionElement: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents, actions?: ICardActions) {
    super(container, events, actions);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      container,
    );

    this.button = ensureElement<HTMLButtonElement>(".card__button", container);

    this.button.addEventListener("click", () => {
      this.events.emit("card:click", {
        id: this.id,
      });
    });
  }

  set description(value: string) {
    this.setText(this.descriptionElement, value);
  }

  set buttonText(value: string) {
    this.setText(this.button, value);
  }

  set disabled(value: boolean) {
    this.setDisabled(this.button, value);
  }
}

/**
 * Карточка корзины
 */
export class CardBasket extends Card<ICardBasket> {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.indexElement = ensureElement<HTMLElement>(
      ".basketitem-index",
      container,
    );

    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basketitem-delete",
      container,
    );

    this.deleteButton.addEventListener("click", () => {
      this.events.emit("basket:remove", {
        id: this.id,
      });
    });
  }

  set index(value: number) {
    this.setText(this.indexElement, value);
  }
}
