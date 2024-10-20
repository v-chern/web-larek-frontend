import { IClickable } from "../../base/View";
import { TPaymentType } from "../../model/LarekApi";

export interface OrderData {
    payment: TPaymentType;
    address: string;
}

export interface OrderSettings extends IClickable<OrderData>{
    payment: string;
    address: string;
}