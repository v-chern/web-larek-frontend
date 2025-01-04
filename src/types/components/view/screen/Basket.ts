export interface IBasketData {
    items: HTMLElement[];
    total: string;
}

export interface IBasketSettings {
    list: string;
    total: string;
    button: string;
    onNext: () => void;
}