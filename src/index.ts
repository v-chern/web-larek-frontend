import './scss/styles.scss';

import { IOrder, TContacts, TPaymentAddress, TPaymentType } from './types/components/model/LarekApi';
import { AppStateChanges, AppStateModals } from './types/components/model/AppState';
import { ModalChange } from './types/components/model/AppStateEmitter';
import { ICardData } from './types/components/view/partial/Card';
import { SETTINGS, API_URL, CDN_URL } from './utils/constants';

import { LarekApi } from './components/model/LarekAPI';
import { AppState } from './components/model/AppState';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { Page } from './components/view/partial/Page';
import { Modal } from './components/view/common/Modal';
import { Basket } from './components/view/screen/Basket';
import { Card } from './components/view/partial/Card';
import { Order } from './components/view/screen/Order';
import { Contacts } from './components/view/screen/Contacts';
import { Success } from './components/view/screen/Success';

const api = new LarekApi(CDN_URL, API_URL);
const app = new AppStateEmitter(AppState, SETTINGS.appState);

//modals
const page = new Page(document.body, {
    ...SETTINGS.pageSettings,
    onClick: () => {
        app.model.openModal(AppStateModals.basket);
    }
});

const modal = new Modal(SETTINGS.modalContainer, {
    ...SETTINGS.modalSettings,
    onClose: () => {
        app.model.openModal(AppStateModals.none);
    }
});

const basket = new Basket(SETTINGS.basketTemplate, {
    ...SETTINGS.basketSettings,
    onNext: () => {
        app.model.openModal(AppStateModals.order);
    }
});

const order = new Order(SETTINGS.orderTemplate, {
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
        app.emit(AppStateChanges.order, data);
    }
});

const contacts = new Contacts(SETTINGS.contactsTemplate, {
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
        app.emit(AppStateChanges.contacts, data);
    }
})

const success = new Success(SETTINGS.successTemplate, {
    ...SETTINGS.successSettings,
    onClose: () => {
        modal.close();
        app.model.clearOrderResult();
    }
})

//logic
app.on(AppStateModals.product, () => {
    const item = app.model.selectedProduct;
    const card = new Card(SETTINGS.cardPreviewTemplate, {
        ...SETTINGS.cardPreviewSettings,
        categoryClasses: SETTINGS.categoryClasses,
        formatCurrency: SETTINGS.appState.formatCurrency,
        onClick: () => {
            app.emit(AppStateChanges.addProduct, item);
            modal.close();
        }
    });
    modal.render({
        content: card.render({
            title: item.title,
            category: item.category,
            description: item.description,
            image: item.image,
            price: item.price,
            isActive: !app.model.getOrder().items.includes(item.id)
        })
    });
 });

app.on(AppStateModals.basket, () => {
    modal.render({ content: basket.render() });
 });

app.on(AppStateModals.order, () => {
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
    modal.render({
        content: contacts.render({
            valid: false,
            errors: []
        })
    })
    contacts.validate();
 });

app.on(AppStateModals.success, () => {
    modal.render({
        content: success.render({
            message: SETTINGS.successSettings.formatMessage(app.model.orderResult.total)
        })
    })
});

app.on(AppStateChanges.modal, ({ current }: ModalChange)  => {
    page.locked = current !== AppStateModals.none;
});

app.on(AppStateChanges.catalog, () => {
    page.catalog = Array.from(app.model.products.items.values()).map((item) => {
        const card = new Card(SETTINGS.cardTemplate, {
            ...SETTINGS.cardSettings,
            categoryClasses: SETTINGS.categoryClasses,
            formatCurrency: SETTINGS.appState.formatCurrency,
            onClick: () => {
                app.model.selectProduct(item.id);
            }
        });
        return card.render({
            id: item.id,
            category: item.category,
            title: item.title,
            image: item.image,
            price: item.price
        });
    });
});

app.on(AppStateChanges.addProduct, (item: ICardData) => {
    app.model.addToBasket(item.id);
});

app.on(AppStateChanges.removeProduct, (item: ICardData) => {
    app.model.removeFromBasket(item.id);
});

app.on(AppStateChanges.basket, () => {
    basket.items = app.model.getBasketItems().map((item, idx) => {
        const card = new Card(SETTINGS.cardBasketTemplate, {
            ...SETTINGS.cardBasketSettings,
            formatCurrency: SETTINGS.appState.formatCurrency,
            onClick: () => {
                app.emit(AppStateChanges.removeProduct, item);
            }
        });
        return card.render({
            id: item.id,
            basketIndex: String(idx + 1),
            title: item.title,
            price: item.price
        });
    });
    basket.total = SETTINGS.appState.formatCurrency(app.model.getBasketTotal());
    page.counter = app.model.getBasketItems().length;
});

app.on(AppStateChanges.order, (data: TPaymentAddress) => {
    app.model.fillAddress(data);
});

app.on(AppStateChanges.contacts, (data: TContacts) => {
    app.model.fillContacts(data);
});

app.on(AppStateChanges.submit, () => {
    const order: IOrder = app.model.getOrder();
    api.createOrder(order)
        .then ((res) => {
            app.model.setOrderResult(res);
        })
        .catch((err: string) => console.log(`Error: ${err}`));
});

api.getProducts()
    .then((products) => {
        app.model.setProductCatalog(products);
    })
    .catch((err: string) => console.log(`Error: ${err}`));