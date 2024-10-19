import { CardData } from "../partial/Card";

export interface MainData {
    items: CardData[];
    counter: number;
}

export interface MainSettings {
    onOpenBasket: () => void;
    onOpenCard: (id: string) => void;
}