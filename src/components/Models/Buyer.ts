import { IBuyer, TBuyerErrors } from "../../types";

export class Buyer {

    protected emptyBuyer: IBuyer = {
        payment: null,
        email: '',
        phone: '',
        address: ''
    };

    protected data: IBuyer = { ...this.emptyBuyer}

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

        this.data = { ...this.emptyBuyer};

    }

    validate(): TBuyerErrors {

        const errors: TBuyerErrors = {};

        if (!this.data.payment)
            errors.payment = 'Выберите способ оплаты';

        if(!this.data.address.trim())
            errors.address = 'Введите адрес';

        if (!this.data.email.trim())
            errors.email = 'Введите email';

        if (!this.data.phone.trim())
            errors.phone = 'Введите телефон';

        return errors;

    }

}