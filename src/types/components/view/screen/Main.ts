import { CardData } from "../partial/Card";
import { ProductData } from "../partial/Product";

export interface ProdutcItem extends ProductData {
    id: string;
}

export interface MainData {
    items: CardData[];
    counter: number;
}

export interface MainSettings {
    onOpenBasket: () => void;
    onOpenCard: (id: string) => void;
}