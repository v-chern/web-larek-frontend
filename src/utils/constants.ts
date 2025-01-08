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
        gallery: '.gallery',
        lockedClass: 'page__wrapper_locked',
    },

    cardTemplate: '#card-catalog',
    cardSettings: {
        category: '.card__category',
        title: '.card__title',
        image: '.card__image',
        price: '.card__price',
    },

    cardPreviewTemplate: '#card-preview',
    cardPreviewSettings: {
        image: '.card__image',
        category: '.card__category',
        title: '.card__title',
        desciption: '.card__text',
        price: '.card__price',
        button: '.card__button',
        buttonText: {
            active: 'Купить',
            inactive: 'В корзине'
        }
    },

    basketTemplate: '#basket',
    basketSettings: {
        list: '.basket__list',
        total: '.basket__price',
        button: '.basket__button'
    },

    cardBasketTemplate: '#card-basket',
    cardBasketSettings: {
        title: '.card__title',
        price: '.card__price',
        basketIndex: '.basket__item-index',
        button: '.card__button'
    },

    orderTemplate: '#order',
    orderSettings: {
        submit: 'button[type=submit]',
        errors: '.form__errors',
        paymentCard: 'button[name=card]',
        paymentCash: 'button[name=cash]',
        paymentActive: 'button_alt-active',
        address: 'input[name=address]',
    },

    contactsTemplate: '#contacts',
    contactsSettings: {
        submit: 'button[type=submit]',
        errors: '.form__errors',
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
        activeClass: 'modal_active'
    },

    //UI parametrization
    categoryClasses: new Map<string, string> ([
        ['софт-скил', 'card__category_soft'],
        ['хард-скил', 'card__category_hard'],
        ['другое', 'card__category_other'],
        ['дополнительное', 'card__category_additional'],
        ['кнопка', 'card__category_button']
    ]),
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