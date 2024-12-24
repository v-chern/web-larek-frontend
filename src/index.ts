import './scss/styles.scss';

import { LarekApi } from './components/model/LarekAPI';
import { AppState } from './components/model/AppState';

import { TPaymentAddress, TContacts, TPaymentType } from './types/components/model/LarekApi';

import { IAppStateSettings } from './types/components/model/AppState';

import { EventEmitter } from './components/base/events';
import { MainScreen } from './components/view/screen/Main';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { SETTINGS, API_URL, CDN_URL } from './utils/constants';
import { MainController } from './components/controller/MainController';

const api = new LarekApi(API_URL);
const app = new AppStateEmitter(api, SETTINGS.appState, AppState);
const main = new MainScreen(new MainController(app.model));
//TODO: Image address нужно формировать из CDN переменной
app.model
    .loadProductCatalog()
    .then(() => {
        //TODO: проверить константы. Почему то ошибка в функции рендер el.render в лист вью
        main.items = Array.from(app.model.products.items.values()).map((item) => {
            console.log(CDN_URL + item.image);
            return {
                id: item.id,
                category: item.category,
                title: item.title,
                image: item.image,
                price: '12 туг'
            }})
    })



/*const appModel : AppState = new AppState(api);

async function modelTest() {
    console.log('Test: Products testing');
    await appModel.loadProductCatalog();
    console.log(appModel.products);

    console.log('Test: Adding items to basket');
    appModel.addToBasket("f3867296-45c7-4603-bd34-29cea3a061d5");
    console.log('Basket Items: ', appModel.getBasketItems());
    console.log('Basket Count: ', appModel.getBasketTotal());
    console.log('User order: ', appModel.getOrder());

    console.log('Test: Adding user details');
    const contacts : TContacts = {
        email: 'test@test.eu',
        phoneNumber: '+7777777777'
    }
    appModel.fillContacts(contacts);
    const pmt : TPaymentAddress = {
        payment: TPaymentType.cash,
        address: 'some long address 7'
    }
    appModel.fillAddress(pmt);    
    console.log('User order: ', appModel.getOrder());

    console.log('Test: placing order')
    appModel.placeOrder(appModel.getOrder())
        .then((res) => {console.log(res)});
}

modelTest();
*/