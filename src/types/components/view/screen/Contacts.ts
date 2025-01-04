import { IChangeable } from "../../base/View";
import { IFormSettings } from "../common/Form";

export interface IContactsData {
    email: string;
    phone: string;
}

export interface IContactsSettings extends IFormSettings{
    email: string;
    phone: string;
    emailError: string;
    phoneError: string;
}