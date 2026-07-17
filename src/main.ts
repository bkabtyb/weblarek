import "./scss/styles.scss";
import { Products } from "./components/Models/Products";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { LarekApi } from "./components/Api/LarekApi";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/Events";
import { Modal } from "./components/View/Modal";
import { CardCatalog } from "./components/View/Card/CardCatalog";
import { CardBasket } from "./components/View/Card/CardBasket";
import { CardPreview } from "./components/View/Card/CardPreview";
import { BasketView } from "./components/View/Basket";
import { Order } from "./components/View/Order";
import { Contacts } from "./components/View/Contacts";
import { Success } from "./components/View/Success";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Header } from "./components/View/Header";
import { Gallery } from "./components/View/Gallery";

const events = new EventEmitter();
const products = new Products(events);
const basket = new Basket(events);
const buyer = new Buyer(events);
const api = new Api(API_URL);
const apiModel = new LarekApi(api);
const modal = new Modal(ensureElement(".modal"), events);
const header = new Header(document.body, events);
const gallery = new Gallery(document.body);
const basketView = new BasketView(cloneTemplate("#basket"), events);
const order = new Order(cloneTemplate("#order"), events);
const contacts = new Contacts(cloneTemplate("#contacts"), events);
const success = new Success(cloneTemplate("#success"), events);

apiModel
  .getProducts()
  .then((data) => {
    products.setItems(data.items);

    console.log("Каталог с сервера", products.getItems());
  })
  .catch((err) => {
    console.error("Ошибка загрузки каталога", err);
  });

events.on("products:changed", () => {
  const cards = products.getItems().map((item) => {
    const card = new CardCatalog(cloneTemplate("#card-catalog"), events, () => {
      products.setPreview(item);
    });

    return card.render({
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image,
    });
  });

  gallery.items = cards;
});

events.on("preview:changed", () => {
  const item = products.getPreview();

  if (!item) return;

  const card = new CardPreview(cloneTemplate("#card-preview"), events, () => {
    events.emit("card:click");
  });

  if (item.price === null) {
    card.buttonText = "Недоступно";
    card.disabled = true;
  } else {
    card.buttonText = basket.has(item.id) ? "Удалить из корзины" : "В корзину";
    card.disabled = false;
  }

  modal.render({
    content: card.render({
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
    }),
  });
});

events.on("basket:changed", () => {
  header.counter = basket.getCount();

  basketView.items = basket.getItems().map((item, index) => {
    const card = new CardBasket(
      cloneTemplate("#card-basket"),

      events,

      () => {
        basket.remove(item.id);
      },
    );

    return card.render({
      title: item.title,

      price: item.price,

      index: index + 1,
    });
  });

  basketView.total = basket.getTotal();

  basketView.buttonDisabled = basket.getCount() === 0;
});

events.on("buyer:changed", () => {
  const data = buyer.getData();

  const errors = buyer.validate();

  order.payment = data.payment;

  order.address = data.address;

  contacts.email = data.email;

  contacts.phone = data.phone;

  order.valid = !errors.payment && !errors.address;

  contacts.valid = !errors.email && !errors.phone;

  order.errors = [errors.payment, errors.address].filter(Boolean).join("\n");

  contacts.errors = [errors.email, errors.phone].filter(Boolean).join("\n");

});

events.on("card:click", () => {
  const item = products.getPreview();

  if (!item) return;

  if (item.price === null) return;

  if (basket.has(item.id)) {
    basket.remove(item.id);
  } else {
    basket.add(item);
  }

  modal.close();
});

events.on("basket:open", () => {
  modal.render({ content: basketView.render() });
});


events.on("basket:remove", (data: { id: string }) => {
  basket.remove(data.id);
});

events.on("order:open", () => {
  modal.render({ content: order.render() });
});
events.on("payment:select", (data: { payment: "card" | "cash" }) => {
  buyer.setData({
    payment: data.payment,
  });
});

events.on("form:change", (data: { field: string; value: string }) => {
  buyer.setData({
    [data.field]: data.value,
  });
});

events.on("form:submit", (data: { form: string }) => {
  if (data.form === "order") {
    modal.render({
      content: contacts.render(),
    });
  }
});

events.on("contacts:submit", () => {
  const data = buyer.getData();

  const orderData = {
    ...data,

    items: basket.getItems().map((item) => item.id),

    total: basket.getTotal(),
  };

  apiModel
    .createOrder(orderData)

    .then((result) => {
      success.total = result.total;

      modal.render({ content: success.render() });

      basket.clear();

      buyer.clear();
    })

    .catch((error) => {
      console.error("Ошибка оформления заказа", error);
    });
});

events.on("success:close", () => {
  modal.close();
});
