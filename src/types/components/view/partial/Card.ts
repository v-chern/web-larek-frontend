import { IClickable } from "../../base/View";
import { IModalSettings } from "../common/Modal";

//in use below
export interface ICardData {
    id: string;
    title: string;
    category: string;
    price: string;
    image?: string;
    description?: string;
    basketIndex?: string;
}

export interface ICardSettings {
    title: string;
    price: string;
    image?: string;
    category?: string;
    desciption?: string;
    button?: string;
    basketIndex?: string;
    onClick: (event: MouseEvent) => void;
}
