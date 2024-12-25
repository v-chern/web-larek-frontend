import { ElementCreator } from "./html";

export interface Settings {
    //interface settings
    pageSelector: string;
    pageSettings: {
        wrapper: string;
        counter: string;
        basket: string;
        lockedClass: string;
    };

    gallerySelector: string;
    gallerySettings: {
        itemClass: string;
    };

    cardTemplate: string;
    cardSettings: {
        category: string;
        title: string;
        image: string;
        price: string;
    };

    productTemplate: string;
    productSettings: {
        image: string;
        category: string;
        title: string;
        desciption: string;
        price: string;
        compactClass: string;
    };

    basketTempalte: string;
    basketSettings: {
        itemClass: string;
    };

    orderTemplate: string;
    orderSettings: {
        payment: string;
        address: string;
    };

    contactsTemplate: string;
    contactsSettings: {
        email: string;
        phone: string;
    };

    successTemplate: string;

    //modals settings
    modalTempalte: string;
    modalSettings: {
        close: string;
        content: string;
        message: string,
        activeClass: string;
        errorMessageClass: string;
    };

    //model settings 
    appState: {
        formatCurrency: (value: number) => string;
    };
}