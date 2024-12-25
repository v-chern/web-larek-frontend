import {
    TPaymentAddress,
    TContacts,
    IProduct,
    IProductCatalog,
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
    catalog = 'change:catalog',
    modal = 'change:modal',
    basket = 'change:basket',
    order = 'change:order'
}

//Application data model
export interface IAppState {
    //Server data
    products?: IProductCatalog;

    // User actioned data
    selectedProduct: IProduct | null;
    userOrder: IOrder | null;

    // UI states
    openedModal: AppStateModals;
    isOrderReady: boolean;
    modalMessage: string | null;
    isValidationError: boolean;
    
    //API actions
    loadProductCatalog(): Promise<void>;
    placeOrder(order: IOrder): Promise<IOrderResult>;

    //Model operations 
    selectProduct(id: string | null): void;
    addToBasket(id: string): void;
    removeFromBasket(id: string): void;
    getBasketTotal(): number;
    getBasketItems(): IProduct[];
    fillAddress(address: TPaymentAddress): void;
    fillContacts(contats: TContacts): void;
    getOrder(): IOrder;

    //UI operations
    openModal(modal: AppStateModals): void;
}

export interface IAppStateSettings {
	formatCurrency(value: number): string;
	onChange(changed: AppStateChanges): void;
}

export interface IAppStateConstructor {
	new (api: ILarekAPI, settings: IAppStateSettings): IAppState;
}