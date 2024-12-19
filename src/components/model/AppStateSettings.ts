import { Settings } from "../../types/settings";

export const appSettings : Settings = {
    pageSelector: "",
    pageSettings: {
        wrapper: "",
        counter: "",
        basket: ""
    },

    gallerySelector: "",
    gallerySettings: {
        itemClass: ""
    },

    cardTemplate: "",
    cardSettings: {
        category: "",
        title: "",
        image: "",
        price: ""
    },

    productTemplate: "",
    productSettings: {
        image: "",
        category: "",
        title: "",
        desciption: "",
        price: "",
        compactClass: ""
    },

    basketTempalte: "",
    basketSettings: {
        itemClass: ""
    },

    orderTemplate: "",
    orderSettings: {
        payment: "",
        address: ""
    },

    contactsTemplate: "",
    contactsSettings: {
        email: "",
        phone: ""
    },

    successTemplate: "",

    //modals settings
    modalTempalte: "",
    modalSettings: {
        close: "",
        content: "",
        activeClass: "",
        errorMessageClass: ""
    }
}