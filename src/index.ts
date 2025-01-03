import './scss/styles.scss';

import { LarekApi } from './components/model/LarekAPI';
import { AppState } from './components/model/AppState';

import { AppStateChanges, AppStateModals, IAppStateSettings } from './types/components/model/AppState';
import { ModalChange } from './types/components/model/AppStateEmitter';


import { AppStateEmitter } from './components/model/AppStateEmitter';
import { SETTINGS, API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/partial/Page';
import { Modal } from './components/view/common/Modal';
import { Basket } from './components/view/partial/Basket';
import { Card } from './components/view/common/Card';
import { CardData } from './types/components/view/partial/Card';
import { TContacts, TPaymentAddress, TPaymentType } from './types/components/model/LarekApi';
import { Order } from './components/view/partial/Order';
import { Contacts } from './components/view/partial/Contacts';
import { Success } from './components/view/partial/Success';

const api = new LarekApi(CDN_URL, API_URL);
const events = new EventEmitter();
events.onAll(({ eventName, data }) => {
    console.log('events:', eventName, data);
});


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
        app.model.openModal(AppStateModals.basket);
    }
});

const modal = new Modal(ensureElement<HTMLElement>(SETTINGS.modalContainer), {
    onClose: () => {
        app.model.openModal(AppStateModals.none);
    }
});

const basket = new Basket(cloneTemplate(basketTemplate), {
    onNext: () => {
        app.model.openModal(AppStateModals.order);
    }
});

const order = new Order(cloneTemplate(orderTemplate), {
    ...SETTINGS.orderSettings,
    ...SETTINGS.orderErrors,
    onClick: (e: Event) => {
        const target = e.target as HTMLInputElement;
        order.payment = target.name as TPaymentType;
        order.validate(); 
    },
    onInputChange: (e: Event) => {
        const target = e.target as HTMLInputElement;
        order.address = target.value;
        order.validate(); 
    },
    onSubmit: (e: Event) => {
        e.preventDefault();
        const data: TPaymentAddress = {
            payment: order.payment,
            address: order.address
        };
        console.log('Form submit', data);
        app.emit(AppStateChanges.order, data);
    }
});

const contacts = new Contacts(cloneTemplate(contactsTemplate), {
    ...SETTINGS.contactsSettings,
    ...SETTINGS.contactsErrors,
    onInputChange: (e:Event) => {
        contacts.validate();
    },
    onSubmit: (e:Event) => {
        e.preventDefault();
        const data: TContacts = {
            email: contacts.email,
            phoneNumber: contacts.phone
        }
        console.log('Form submit', data);
        app.emit(AppStateChanges.contacts, data);
    }
})

const success = new Success(cloneTemplate(successTemplate), {
    ...SETTINGS.successSettings,
    onClose: () => {
        app.model.clearOrder();
    }
})

app.on(AppStateModals.product, () => {
    const item = app.model.selectedProduct;
    const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
        onClick: () => app.emit(AppStateChanges.addProduct, item)
    });
    modal.render({
        content: card.render({
            title: item.title,
            category: item.category,
            description: item.description,
            image: item.image,
            price: SETTINGS.appState.formatCurrency(item.price)
        })
    });
 });

app.on(AppStateModals.basket, () => {
    console.log('modal: Basket');

    basket.items = app.model.getBasketItems().map((item, idx) => {
        const card = new Card('card', cloneTemplate(cardBasketTemplate), {
            onClick: () => {
                app.emit(AppStateChanges.removeProduct, item);
            }
        });
        return card.render({
            id: item.id,
            basketIndex: String(idx + 1),
            title: item.title,
            price: SETTINGS.appState.formatCurrency(item.price)
        });
    });
    basket.total = SETTINGS.appState.formatCurrency(app.model.getBasketTotal());
    modal.render({ content: basket.render() });
 });

app.on(AppStateModals.order, () => {
    console.log('modal: Order');
    modal.render({ 
        content: order.render({
            address: app.model.getOrder().address,
            payment: app.model.getOrder().payment,
            valid: false,
            errors: []
        })
    });
    order.validate();
});

app.on(AppStateModals.contacts, () => {
    console.log('modal: Contacts');
    modal.render({
        content: contacts.render({
            valid: false,
            errors: []
        })
    })
    contacts.validate();
 });

app.on(AppStateModals.success, () => {
    console.log('modal: Success');
    console.log(app.model.orderResult);
    modal.render({
        content: success.render({
            message: SETTINGS.successSettings.formatMessage(app.model.orderResult.total)
        })
    })
});

app.on(AppStateChanges.modal, ({ previous, current }: ModalChange)  => {
    console.log('app change: Modal');
    page.locked = current !== AppStateModals.none;
});

app.on(AppStateChanges.catalog, () => {
    console.log(`app: Catalog`);
    page.catalog = Array.from(app.model.products.items.values()).map((item) => {
        const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
            onClick: () => {
                app.model.selectProduct(item.id);
            }
        });
        return card.render({
            id: item.id,
            category: item.category,
            title: item.title,
            image: item.image,
            price: SETTINGS.appState.formatCurrency(item.price)
        });
    });
});

app.on(AppStateChanges.product, () => {
    app.model.openModal(AppStateModals.product);
});

app.on(AppStateChanges.addProduct, (item: CardData) => {
    console.log('app change: Add to basket', item.id);
    app.model.addToBasket(item.id);
});

app.on(AppStateChanges.removeProduct, (item: CardData) => {
    console.log('app change: Remove from basket', item.id);
    app.model.removeFromBasket(item.id);
});

app.on(AppStateChanges.basket, () => {
    console.log('app change: Basket change');
    page.counter = app.model.getBasketItems().length;
    if (app.model.openedModal === AppStateModals.basket) {
        app.emit(AppStateModals.basket);
    }
});

app.on(AppStateChanges.order, (data: TPaymentAddress) => {
    console.log('app change: save address');
    app.model.fillAddress(data);
    app.model.openModal(AppStateModals.contacts);
    console.log(app.model.getOrder());
});

app.on(AppStateChanges.contacts, (data: TContacts) => {
    console.log('app change: save contacts');
    app.model.fillContacts(data);
    app.emit(AppStateChanges.submit);
});

app.on(AppStateChanges.submit, () => {
    console.log('app change: submit order');
    app.model.placeOrder();
});

app.on(AppStateChanges.success, () => {
    console.log('app change: success order');
    console.log(app.model.orderResult);
    app.model.openModal(AppStateModals.success);
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