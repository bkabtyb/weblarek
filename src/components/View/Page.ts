import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected gallery: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;
    protected wrapper: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.gallery = ensureElement<HTMLElement>('.gallery');
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket');
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter');
        this.wrapper = ensureElement<HTMLElement>('.page__wrapper');

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(value: number) {
        this.setText(this.counterElement, value);
    }

    set catalog(items: HTMLElement[]) {
        this.gallery.replaceChildren(...items);
    }

    set locked(value: boolean) {
        this.wrapper.classList.toggle('page__wrapper_locked', value);
    }
}

