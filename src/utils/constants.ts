import { Settings } from "../types/settings";

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

    basketTempalte: '#basket',
    basketSettings: {
        itemClass: '.basket__item',
    },

    orderTemplate: '#order',
    orderSettings: {
        payment: '.order__buttons',
        address: 'input[name=address]',
    },

    contactsTemplate: '#contacts',
    contactsSettings: {
        email: 'input[name=phone]',
        phone: 'input[name=email]',
    },

    successTemplate: '#success',

    //modals settings
    modalTempalte: '.modal',
    modalSettings: {
        close: '.modal__close',
        content: '.modal__content',
        activeClass: '.modal_active',
        errorMessageClass: '.modal__message_error',
    },

    //model settings 
    appState: {
        formatCurrency: (value: number) => `${value} туг.`,
    }
}