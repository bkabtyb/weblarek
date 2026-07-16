import { IBuyer, TBuyerErrors } from "../../types";
import { IEvents } from "../base/Events";

const emptyBuyer: IBuyer = {
  payment: null,
  email: "",
  phone: "",
  address: "",
};

export class Buyer {
  protected data: IBuyer = { ...emptyBuyer };

  constructor(protected events: IEvents) {}

  setData(data: Partial<IBuyer>): void {
    this.data = {
      ...this.data,
      ...data,
    };

    this.events.emit("buyer:changed");
  }

  getData(): IBuyer {
    return this.data;
  }

  clear(): void {
    this.data = {
      ...emptyBuyer,
    };

    this.events.emit("buyer:changed");
  }

  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};

    if (!this.data.payment) {
      errors.payment = "Выберите способ оплаты";
    }

    if (!this.data.address.trim()) {
      errors.address = "Введите адрес";
    }

    if (!this.data.email.trim()) {
      errors.email = "Введите email";
    }

    if (!this.data.phone.trim()) {
      errors.phone = "Введите телефон";
    }

    return errors;
  }
}
