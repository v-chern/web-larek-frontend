import './scss/styles.scss';

import { LarekApi } from './components/model/LarekAPI';
import { AppState } from './components/model/AppState';

import { TPaymentAddress, TContacts, TPaymentType } from './types/components/model/LarekApi';

import { AppStateChanges, AppStateModals, IAppStateSettings } from './types/components/model/AppState';

import { EventEmitter } from './components/base/events';
import { MainScreen } from './components/view/screen/MainScreen';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { SETTINGS, API_URL, CDN_URL } from './utils/constants';
import { MainController } from './components/controller/MainController';
import { cloneTemplate, ensureElement } from './utils/utils';

const api = new LarekApi(CDN_URL, API_URL);
const app = new AppStateEmitter(api, SETTINGS.appState, AppState);
const main = new MainScreen(new MainController(app.model));

/*// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})
    */

app.on(AppStateChanges.catalog, () => {
    console.log(`event: Catalog`);
    main.items = Array.from(app.model.products.items.values()).map((item) => {
        return {
            id: item.id,
            category: item.category,
            title: item.title,
            image: item.image,
            price: SETTINGS.appState.formatCurrency(item.price)
        }})
})

app.on(AppStateChanges.modal, () => {
    console.log('event: Open Modal');
    console.log(app.model.openedModal);
    app.model.openedModal = AppStateModals.none;
    //console.log(app.model.selectedProduct);
}) 

app.model
    .loadProductCatalog()
    .then(() => {})
    .catch((err: string) => console.log(`Error: ${err}`));



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