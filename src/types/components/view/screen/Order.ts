import { TPaymentType } from "../../model/LarekApi";
import { IFormSettings } from "../common/Form";

export interface IOrderData {
    payment: TPaymentType;
    address: string;
}

export interface IOrderSettings extends IFormSettings {
    paymentCard: string;
    paymentCash: string;
    paymentActive: string;
    address: string;
    paymentError: string;
    addressError: string;
    onClick: (e: Event) => void;
}