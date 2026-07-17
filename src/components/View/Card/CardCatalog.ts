import { ProductCard } from "./ProductCard";
import { IProduct } from "../../../types";
import { IEvents } from "../../base/Events";

export class CardCatalog extends ProductCard<Partial<IProduct>> {
  constructor(
    container: HTMLElement,
    events: IEvents,
    protected onClick: () => void,
  ) {
    super(container, events);

    this.container.addEventListener("click", () => {
      this.onClick();
    });
  }
}
