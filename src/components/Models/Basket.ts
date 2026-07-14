import { IProduct } from "../../types";

export class Basket {

    protected items: IProduct[] = [];

    getItems(): IProduct[] {
        return this.items;
    }

    add(item: IProduct): void {

        if (!this.has(item.id)) {
            this.items.push(item);
        }

    }

    remove(id: string): void {

        this.items = this.items.filter(item => item.id !== id);

    }

    clear(): void {

        this.items = [];

    }

    getTotal(): number {

        return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);

    }

    getCount(): number {

        return this.items.length;

    }

    has(id: string): boolean {

        return this.items.some(item => item.id === id);

    }

}