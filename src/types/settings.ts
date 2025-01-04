import { ElementCreator } from "./html";

export interface Settings {
    //interface settings
    pageSelector: string;
    pageSettings: {
        wrapper: string;
        counter: string;
        basket: string;
        gallery: string;
        lockedClass: string;
    };

    cardTemplate: string;
    cardSettings: {
        category: string;
        title: string;
        image: string;
        price: string;
    };

    cardPreviewTemplate: string;
    cardPreviewSettings: {
        image: string;
        category: string;
        title: string;
        desciption: string;
        price: string;
        button: string;
    };

    basketTemplate: string;
    basketSettings: {
        list: string,
        total: string,
        button: string
    },

    basketCardTemplate: string,
    basketCardSettings: {
        title: string,
        price: string,
        basketIndex: string
    },

    orderTemplate: string;
    orderSettings: {
        submit: string;
        errors: string;
        paymentCard: string;
        paymentCash: string;
        paymentActive: string;
        address: string;
    },
    contactsTemplate: string;
    contactsSettings: {
        submit: string;
        errors: string;
        email: string;
        phone: string;
    },

    successTemplate: string;
    successSettings: {
        descripion: string;
        closeButton: string;
        formatMessage: (value: number) => string;
    },

    orderErrors: {
        paymentError: string;
        addressError: string;
    };
    contactsErrors: {
        emailError: string;
        phoneError: string;
    };

    //modals settings
    modalContainer: string;
    modalSettings: {
        close: string;
        content: string;
        activeClass: string;
    };

    //model settings 
    appState: {
        formatCurrency: (value: number) => string;
    };
}