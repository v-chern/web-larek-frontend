import { ProductData } from "../partial/Product";

export interface BasketData {
    products: ProductData[];
    total: number;
}

export interface BasketSettings {
    onRemove: (id: string) => void;
    onClose: () => void;
    onNext: () => void;
}