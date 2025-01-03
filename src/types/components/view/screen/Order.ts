import { IChangeable, IClickable } from "../../base/View";
import { TPaymentType } from "../../model/LarekApi";

export interface IOrderData {
    payment: TPaymentType;
    address: string;
}

export interface IOrderSettings {
    paymentCard: string;
    paymentCash: string;
    paymentActive: string;
    address: string;
    paymentError: string;
    addressError: string;
    onClick: (e: Event) => void;
    onInputChange: (e: Event) => void;
    onSubmit: (e: Event) => void;
}