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
    order = 'modal:order',
    contacts = 'modal:contacts',
    success = 'modal:success'
}

export enum AppStateChanges {
    modal = 'change:modal',
    catalog = 'change:catalog',
    addProduct = 'change:add',
    removeProduct = 'change:remove',
    basket = 'change:basket',
    order = 'change:order',
    contacts = 'change:contacts',
    submit = 'change:submit'
}

//Application data model
export interface IAppState {
    //Server data
    products?: IProductCatalog;

    // User actioned data
    selectedProduct: IProduct | null;
    userOrder: IOrder | null;
    orderResult: IOrderResult | null;

    // UI states
    isOrderReady: boolean;
    modalMessage: string | null;
    isValidationError: boolean;
    
    //Model operations 
    setProductCatalog(products: IProductCatalog): void;
    selectProduct(id: string | null): void;
    addToBasket(id: string): void;
    removeFromBasket(id: string): void;
    getBasketTotal(): number;
    getBasketItems(): IProduct[];
    fillAddress(address: TPaymentAddress): void;
    fillContacts(contats: TContacts): void;
    getOrder(): IOrder;
    clearOrder(): void;
    setOrderResult(result: IOrderResult): void;
    clearOrderResult(): void;

    //UI operations
    openModal(modal: AppStateModals): void;
}

export interface IAppStateSettings {
	formatCurrency(value: number): string;
	onChange(changed: AppStateChanges, modal?: AppStateModals): void;
}

export interface IAppStateConstructor {
	new (settings: IAppStateSettings): IAppState;
}