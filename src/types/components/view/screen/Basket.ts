export interface IBasketSettings {
    onNext: () => void;
}

export interface IBasketData {
    items: HTMLElement[];
    total: number;
}

/*
export interface BasketData {
    products: ProductData[];
    total: number;
}

export interface BasketSettings {
    onRemove: (id: string) => void;
    onClose: () => void;
    onNext: () => void;
}
*/