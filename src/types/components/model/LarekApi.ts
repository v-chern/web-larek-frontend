export enum TPaymentType {
    card = "card",
    cash = "cash"
}

export type ApiListResponse<Type> = {
    total: number;
    items: Type[];
}

export type TPaymentAddress = {
    payment: TPaymentType;
    address: string;
}

export type TContacts = {
    email: string;
    phoneNumber: string;
}

export interface IProduct {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    price: number
}

export interface IProductCatalog {
    items: Map<string, IProduct>;
    itemsCount: number
 }

export interface IOrder {
    items: string[];
    total: number;
    payment: TPaymentType | null;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderResult{
    id: string;
    total: number;
}

export interface ILarekAPI {
    getProducts: () => Promise<IProductCatalog>;
    getProductDetails: (id: string) => Promise<IProduct>;
    createOrder: (order: object) => Promise<IOrderResult>;
}