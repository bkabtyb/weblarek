import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { LarekApi } from './components/Api/LarekApi';
import { Api } from './components/base/Api';


const products = new Products();
const basket = new Basket();
const buyer = new Buyer();

products.setItems(apiProducts.items);

console.log('Каталог', products.getItems());

console.log('Товар по id', products.getItem(apiProducts.items[0].id));

products.setPreview(apiProducts.items[0]);

console.log('Выбранный товар', products.getPreview());

basket.add(apiProducts.items[0]);
basket.add(apiProducts.items[1]);

console.log('Товары в корзине', basket.getItems());

console.log('Количество товаров', basket.getCount());

console.log('Общая стоимость товаров', basket.getTotal());

console.log('Наличие товара', basket.has(apiProducts.items[0].id));

basket.remove(apiProducts.items[0].id);

console.log('Корзина после удаления товаров', basket.getItems());

basket.clear();

console.log('Корзина после очистки', basket.getItems());

buyer.setData({
    payment: 'card',
    address: 'Москва'
});

buyer.setData({
    email: 'test@test.ru'
});

buyer.setData({
    phone: '+79999999999'
});

console.log('Данные покупателя', buyer.getData());

console.log('Ошибка валидации', buyer.validate());

buyer.clear();

console.log('Данные после очистки', buyer.getData());

import { API_URL } from './utils/constants';

const api = new Api(API_URL);

const apiModel = new LarekApi(api);

apiModel
    .getProducts()
    .then((data) => {

        products.setItems(data.items);

        console.log(
            'Каталог с сервера',
            products.getItems()
        );

    })
    .catch((err) => {

        console.error('Ошибка загрузки каталога', err);

    });