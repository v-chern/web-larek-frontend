import {
    TPaymentAddress,
    TContacts,
    IProduct,
    IProductCatalog,
    IBasket,
    IOrder,
    IOrderResult,
    ILarekAPI
} from './LarekApi'

export type TProductData = {
    id: string;
    title: string;
    price: number;
}

export type TProductDetails = TProductData & {
    category: string;
    description: string;
    image: string;
}

// Application modal windows
export enum AppStateModals {
    none = 'modal:none',
    product = 'modal:product',
    basket = 'modal:basket',
    address = 'modal:order',
    contacts = 'modal:contacts',
    success = 'modal:success'
}

export enum AppStateChanges {
    selectedProduct,
    modal,
    basket,
    order
}

//Application data model
export interface AppState {
    //Server data
    products?: IProductCatalog;

    // User actioned data
    selectedProduct: IProduct | null;
    userBasket: IBasket;
    userOrder: IOrder | null;

    // UI states
    openedModal: AppStateModals;
    isOrderReady: boolean;
    modalMessage: string | null;
    isValidationError: boolean;
    
    //API actions
    loadProducts(): Promise<void>;
    placeOrder(order: IOrder): Promise<IOrderResult>;

    //User actions
    addToBasket(id: string): void;
    removeFromBasket(id: string): void;
    fillAddress(address: TPaymentAddress): void;
    fillContacts(contats: TContacts): void;

    //UI operations
    openModal(modal: AppStateModals): void;
}

export interface AppStateSettings {
	formatCurrency(value: number): string;
	onChange(changed: AppStateChanges): void;
}

export interface AppStateConstructor {
	new (api: ILarekAPI, settings: AppStateSettings): AppState;
}