import { IBuyer } from "../../types";

export class Buyer {

    protected data: IBuyer = {
        payment: '' as any,
        email: '',
        phone: '',
        address: ''
    };

    setData(data: Partial<IBuyer>): void {

        this.data = {
            ...this.data,
            ...data
        };

    }

    getData(): IBuyer {

        return this.data;

    }

    clear(): void {

        this.data = {
            payment: '' as any,
            email: '',
            phone: '',
            address: ''
        };

    }

    validate(): Record<string, string> {

        const errors: Record<string, string> = {};

        if (!this.data.payment)
            errors.payment = 'Выберите способ оплаты';

        if (!this.data.address)
            errors.address = 'Введите адрес';

        if (!this.data.email)
            errors.email = 'Введите email';

        if (!this.data.phone)
            errors.phone = 'Введите телефон';

        return errors;

    }

}