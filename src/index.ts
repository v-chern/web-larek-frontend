import './scss/styles.scss';

import { LarekApi } from './components/model/LarekAPI';
import { AppState } from './components/model/AppState';

import { TPaymentAddress, TContacts, TPaymentType } from './types/components/model/LarekApi';
import { ensureElement } from './utils/utils';
import { AppStateChanges, AppStateModals, IAppStateSettings } from './types/components/model/AppState';
import { ModalChange } from './types/components/model/AppStateEmitter';


import { MainScreen } from './components/view/screen/MainScreen';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { SETTINGS, API_URL, CDN_URL } from './utils/constants';
import { MainController } from './components/controller/MainController';
import { BasketScreen } from './components/view/screen/BasketScreen';
import { BasketController } from './components/controller/BasketController';

const api = new LarekApi(CDN_URL, API_URL);
const app = new AppStateEmitter(api, SETTINGS.appState, AppState);
const main = new MainScreen(new MainController(app.model));
//console.log(SETTINGS.basketSettings);

const modal = {
    [AppStateModals.product]: new BasketScreen(new BasketController(app.model)),
    [AppStateModals.basket]: new BasketScreen(new BasketController(app.model)),
    [AppStateModals.address]: new BasketScreen(new BasketController(app.model)),
    [AppStateModals.contacts]: new BasketScreen(new BasketController(app.model)),
    [AppStateModals.success]: new BasketScreen(new BasketController(app.model))
};

console.log(modal);

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

/*
app.on(AppStateModals.basket, () => {
	console.log('modals basket');
	modal[AppStateModals.basket].render({
		header: {
			title: SETTINGS.basketModal.headerTitle,
			description: app.model.basket.size
				? app.model.formatMovieDescription(app.model.getBasketMovie())
				: '',
		},
		tickets: Array.from(app.model.basket.values()).map((ticket) => {
			return app.model.formatTicketDescription(ticket);
		}),
		total: app.model.formatCurrency(app.model.basketTotal),
		isDisabled: app.model.basket.size === 0,
		isActive: true,
	});
});
*/

app.on(AppStateChanges.modal, ({ previous, current }: ModalChange)  => {
    console.log('event modal');
    main.page.isLocked = current !== AppStateModals.none;
	/*if (previous !== AppStateModals.none) {
		modal[previous].render({ isActive: false });
	}*/
});

app.on(AppStateModals.basket, () => {
    console.log('event basket');
    modal[AppStateModals.basket].modal.isActive = true;
    
    /*modal[AppStateModals.basket].items = [{
        id: 'string',
        category: 'string',
        title: 'string',
        image: 'string',
        price: 'string' 
    }]*/
 });

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