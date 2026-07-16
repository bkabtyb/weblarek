import "./scss/styles.scss";
import { Products } from "./components/Models/Products";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { LarekApi } from "./components/Api/LarekApi";
import { Api } from "./components/base/Api";
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/Events";
import { Modal } from "./components/View/Modal";
import { Page } from "./components/View/Page";
import { CardCatalog, CardPreview, CardBasket } from "./components/View/Card";
import { BasketView } from "./components/View/Basket";
import { Order } from "./components/View/Order";
import { Contacts } from "./components/View/Contacts";
import { Success } from "./components/View/Success";
import { cloneTemplate, ensureElement } from "./utils/utils";

const events = new EventEmitter();
const products = new Products(events);
const basket = new Basket(events);
const buyer = new Buyer(events);
const api = new Api(API_URL);
const apiModel = new LarekApi(api);
const modal = new Modal(ensureElement(".modal"), events);
const page = new Page(document.body, events);

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
    const card = new CardCatalog(cloneTemplate("#card-catalog"), events);

    return card.render({
      id: item.id,
      title: item.title,
      price: item.price,
      image: CDN_URL + item.image,
      category: item.category,
    });
  });

  page.catalog = cards;
});

events.on("card:select", (data: { id: string }) => {
  const item = products.getItem(data.id);

  if (item) {
    products.setPreview(item);
  }
});

events.on("preview:changed", () => {
  const item = products.getPreview();

  if (!item) return;

  const card = new CardPreview(cloneTemplate("#card-preview"), events);

  card.buttonText = basket.has(item.id) ? "Удалить из корзины" : "В корзину";

  modal.render({
    content: card.render({
      id: item.id,
      title: item.title,
      description: item.description,
      image: CDN_URL + item.image,
      category: item.category,
      price: item.price,
    }),
  });
});

events.on("basket:changed", () => {
  page.counter = basket.getCount();
  }
);

events.on("card:click", (data: { id: string }) => {
  const item = products.getItem(data.id);

  if (!item) return;

  if (basket.has(data.id)) {
    basket.remove(data.id);
  } else {
    basket.add(item);
  }

  modal.close();
});

events.on("basket:open", () => {
  const basketView = new BasketView(cloneTemplate("#basket"), events);

  basketView.items = basket.getItems().map((item, index) => {
    const card = new CardBasket(cloneTemplate("#card-basket"), events);

    return card.render({
      title: item.title,
      price: item.price,
      id: item.id,
      index: index + 1,
    });
  });

  basketView.total = basket.getTotal();

  basketView.buttonDisabled = basket.getItems().length === 0;

  modal.render({content: basketView.render()});
});

events.on("buyer:changed", () => {
  const errors = buyer.validate();

  console.log("Ошибки покупателя", errors);
});

events.on("basket:remove", (data: { id: string }) => {
  basket.remove(data.id);
});

events.on("order:open", () => {
  const order = new Order(cloneTemplate("#order"), events);

  modal.render({content: order.render()});
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

events.on("order:submit", () => {
  const contacts = new Contacts(cloneTemplate("#contacts"), events);

  modal.render({content: contacts.render()});
});

events.on("contacts:submit", () => {
  const data = buyer.getData();

  const order = {
    ...data,

    items: basket.getItems().map((item) => item.id),

    total: basket.getTotal(),
  };

  apiModel
    .createOrder(order)

    .then(() => {
      const success = new Success(cloneTemplate("#success"), events);

      success.total = basket.getTotal();

      modal.render({content: success.render()});

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
