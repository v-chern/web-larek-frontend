import './scss/styles.scss';

import { LarekApi } from './components/model/LarekAPI';
import { AppState } from './components/model/AppState';

import { TPaymentAddress, TContacts, TPaymentType } from './types/components/model/LarekApi';

import { IAppStateSettings } from './types/components/model/AppState';

import { EventEmitter } from './components/base/events';


const API_BASE_URL = 'https://larek-api.nomoreparties.co/api/weblarek';
const api = new LarekApi(API_BASE_URL);

const app : AppState = new AppState(api);

async function modelTest() {
    console.log('Test: Products testing');
    await app.loadProductCatalog();
    console.log(app.products);

    console.log('Test: Adding items to basket');
    app.addToBasket("f3867296-45c7-4603-bd34-29cea3a061d5");
    console.log('Basket Items: ', app.getBasketItems());
    console.log('Basket Count: ', app.getBasketTotal());
    console.log('User order: ', app.getOrder());

    console.log('Test: Adding user details');
    const contacts : TContacts = {
        email: 'test@test.eu',
        phoneNumber: '+7777777777'
    }
    app.fillContacts(contacts);
    const pmt : TPaymentAddress = {
        payment: TPaymentType.cash,
        address: 'some long address 7'
    }
    app.fillAddress(pmt);    
    console.log('User order: ', app.getOrder());

    console.log('Test: placing order')
    app.placeOrder(app.getOrder())
        .then((res) => {console.log(res)});
}

modelTest();