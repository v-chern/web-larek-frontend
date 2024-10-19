import { IClickable } from "../../base/View";

export interface CardData {
    id: string;
    category: string;
    title: string;
    image: string;
    price: string;
}

export interface CardSettings extends IClickable<string> {
    category: string;
    title: string;
    image: string;
    price: string;
}

