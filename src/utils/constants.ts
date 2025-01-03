import { Settings } from "../types/settings";
import { formatNumber } from "./utils";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS: Settings = {
    //interface settings
    pageSelector: '.page',
    pageSettings: {
        wrapper: '.page__wrapper',
        counter: '.header__basket-counter',
        basket: '.header__basket',
        lockedClass: '.page__wrapper_locked'
    },

    gallerySelector: '.gallery',
    gallerySettings: {
        itemClass: 'gallery__item',
    },

    cardTemplate: '#card-catalog',
    cardSettings: {
        category: '.card__category',
        title: '.card__title',
        image: '.card__image',
        price: '.card__price',
    },

    productTemplate: '#card-preview',
    productSettings: {
        image: '.card__image',
        category: '.card__category',
        title: '.card__title',
        desciption: '.card__text',
        price: '.card__price',
        compactClass: '.card_compact',
    },

    basketTemplate: '#basket',
    basketSettings: {
        itemClass: 'basket__item',
        itemIndexClass: '.basket__item-index',
    },

    basketCardTemplate: '#card-basket',
    basketCardSettings: {
        title: '.card__title',
        price: '.card__price',
    },

    orderTemplate: '#order',
    orderSettings: {
        paymentCard: 'button[name=card]',
        paymentCash: 'button[name=cash]',
        paymentActive: 'button_alt-active',
        address: 'input[name=address]',
    },

    contactsTemplate: '#contacts',
    contactsSettings: {
        email: 'input[name=phone]',
        phone: 'input[name=email]',
    },

    successTemplate: '#success',
    successSettings: {
        descripion: '.order-success__description',
        closeButton: '.order-success__close',
        formatMessage(value: number): string {
            return `Списано ${formatNumber(value)} синапсов`
        }
    },

    //modals settings
    modalContainer: '#modal-container',
    modalSettings: {
        close: '.modal__close',
        content: '.modal__content',
        message: '.modal__message',
        activeClass: 'modal_active',
        errorMessageClass: '.modal__message_error',
    },

    //form validation errors
    orderErrors: {
        paymentError: 'Выберите способ оплаты',
        addressError: 'Укажите адрес доставки'
    },
    contactsErrors: {
        emailError: 'Укажите корректный e-mail',
        phoneError: 'Укадите корректный номер телефона'
    },

    //model settings 
    appState: {
        formatCurrency (value: number) : string {
            let retVal = 'Бесценно';
            if(value) {
                retVal = `${formatNumber(value)} синапсов`
            }
            return retVal;
        }
    }
}