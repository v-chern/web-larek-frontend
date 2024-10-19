import { IChangeable } from "../../base/View";

export interface ContactsData {
    email: string;
    phone: string;
}

export interface ContactsSettings extends IChangeable<ContactsData> {
    email: string;
    phone: string;
}