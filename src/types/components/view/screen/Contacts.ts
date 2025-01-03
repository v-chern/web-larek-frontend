import { IChangeable } from "../../base/View";

export interface IContactsData {
    email: string;
    phone: string;
}

export interface IContactsSettings {
    email: string;
    phone: string;
    emailError: string;
    phoneError: string;
    onInputChange: (e: Event) => void;
    onSubmit: (e: Event) => void;
}