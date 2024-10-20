import { ProductData } from "../partial/Product";

export interface BasketData {
    products: ProductData[];
    total: string;
}

export interface BasketSettings {
    onRemove: (id: string) => void;
    onClose: () => void;
    onNext: () => void;
}