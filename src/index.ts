import './scss/styles.scss';

import { LarekApi } from './components/model/LarekAPI';
import { AppState } from './components/model/AppState';

import { AppStateChanges, AppStateModals, IAppStateSettings } from './types/components/model/AppState';
import { ModalChange } from './types/components/model/AppStateEmitter';


import { MainScreen } from './components/view/screen/MainScreen';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { SETTINGS, API_URL, CDN_URL } from './utils/constants';
import { MainController } from './components/controller/MainController';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/common/Page';
import { Modal } from './components/view/common/Modal';
import { Basket } from './components/view/common/Basket';
import { Card } from './components/view/common/Card';
import { CardData } from './types/components/view/partial/Card';

const api = new LarekApi(CDN_URL, API_URL);
const events = new EventEmitter();
events.onAll(({ eventName, data }) => {
    console.log('events:', eventName, data);
})

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const app = new AppStateEmitter(api, SETTINGS.appState, AppState);

const page = new Page(document.body, {
    onClick: () => {
        app.emit(AppStateModals.basket);
    }
});

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);

app.onAll(({ eventName, data }) => {
    console.log('app:', eventName, data);
})

app.on(AppStateChanges.catalog, () => {
    console.log(`app: Catalog`);
    page.catalog = Array.from(app.model.products.items.values()).map((item) => {
        const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
            onClick: () => {
                app.model.openModal(AppStateModals.product);
                app.emit(AppStateModals.product, item);
            }
        });
        return card.render({
            id: item.id,
            category: item.category,
            title: item.title,
            image: item.image,
            price: SETTINGS.appState.formatCurrency(item.price)
        });
    })
})

app.on(AppStateModals.product, (item: CardData) => {
    console.log('app: Product', item.id);
    const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
        onClick: () => app.emit(AppStateChanges.addProduct, item)
    });
    modal.render({
        content: card.render({
            id: item.id,
            title: item.title,
            category: item.category,
            description: item.description,
            image: item.image,
            price: item.price
        })
    });
 });

app.on(AppStateChanges.addProduct, (item: CardData) => {
    console.log('app: Add to basket', item.id);
    app.model.addToBasket(item.id);
});

app.on(AppStateChanges.removeProduct, (item: CardData) => {
    console.log('app: Remove from basket', item.id);
    app.model.removeFromBasket(item.id);
});

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
    console.log('app: Modal');
    page.locked = current !== AppStateModals.none;
	/*if (previous !== AppStateModals.none) {
		modal[previous].render({ isActive: false });
	}*/
});

app.on(AppStateModals.basket, () => {
    console.log('app: Basket');
    //modal[AppStateModals.basket].modal.isActive = true;
    
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