import './scss/styles.scss';

import { LarekApi } from './components/model/LarekAPI';
import { AppState } from './components/model/AppState';

import { TPaymentAddress, TContacts, TPaymentType } from './types/components/model/LarekApi';

import { IAppStateSettings } from './types/components/model/AppState';

import { EventEmitter } from './components/base/events';
import { MainScreen } from './components/view/screen/Main';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { SETTINGS } from './utils/constants';
import { MainController } from './components/controller/MainController';

const API_BASE_URL = 'https://larek-api.nomoreparties.co/api/weblarek';
const api = new LarekApi(API_BASE_URL);
const app = new AppStateEmitter(api, SETTINGS.appState, AppState);
const main = new MainScreen(new MainController(app.model));

app.model
    .loadProductCatalog()
    .then(() => {
        main.items = Array.from(app.model.products.items.values()).map((item) => {
            return {
                id: item.id,
                category: item.category,
                title: item.title,
                image: item.image,
                price: ''
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