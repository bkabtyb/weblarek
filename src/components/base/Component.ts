export abstract class Component<T> {
  constructor(protected container: HTMLElement) {}

  /**
   * Вернуть корневой элемент компонента
   */
  render(data?: Partial<T>): HTMLElement {
    if (data) {
      Object.assign(this, data);
    }

    return this.container;
  }

  protected setText(element: HTMLElement, value: unknown): void {
    element.textContent = String(value);
  }

  protected setImage(
    element: HTMLImageElement,
    src: string,
    alt?: string,
  ): void {
    element.src = src;

    if (alt) {
      element.alt = alt;
    }
  }

  protected setDisabled(element: HTMLButtonElement, state: boolean): void {
    element.disabled = state;
  }

  protected setHidden(element: HTMLElement): void {
    element.hidden = true;
  }

  protected setVisible(element: HTMLElement): void {
    element.hidden = false;
  }
}
