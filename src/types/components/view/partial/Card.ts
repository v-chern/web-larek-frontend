import { IClickable } from "../../base/View";

export interface CardData {
    id: string;
    category: string;
    title: string;
    image: string;
    price: string;
    description?: string;
}

export interface CardSettings extends IClickable<string> {
    category?: string;
    image?: string;
    title: string;
    price: string;
}

