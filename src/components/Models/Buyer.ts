import { IBuyer, TBuyerErrors } from "../../types";

 const emptyBuyer: IBuyer = {
        payment: null,
        email: '',
        phone: '',
        address: ''
    };

export class Buyer {

    protected data: IBuyer = { ...emptyBuyer}

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

        this.data = { ...emptyBuyer};

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