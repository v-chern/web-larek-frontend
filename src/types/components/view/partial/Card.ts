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
    onClick: (event: MouseEvent) => void;
}
