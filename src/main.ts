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

console.log(products.getItem(apiProducts.items[0].id));

products.setPreview(apiProducts.items[0]);

console.log(products.getPreview());

basket.add(apiProducts.items[0]);
basket.add(apiProducts.items[1]);

console.log(basket.getItems());

console.log(basket.getCount());

console.log(basket.getTotal());

console.log(basket.has(apiProducts.items[0].id));

basket.remove(apiProducts.items[0].id);

console.log(basket.getItems());

basket.clear();

console.log(basket.getItems());

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

console.log(buyer.getData());

console.log(buyer.validate());

buyer.clear();

console.log(buyer.getData());

const api = new Api(import.meta.env.VITE_API_ORIGIN);

const apiModel = new LarekApi(api);

apiModel.getProducts().then((data) => {

    products.setItems(data.items);

    console.log('Каталог с сервера', products.getItems());

});