import { 
    TPaymentAddress,
    TContacts,
    IProduct,
    IProductCatalog,
    IOrder,
    IOrderResult,
    ILarekAPI,
    TPaymentType
 } from "../../types/components/model/LarekApi";

import { 
    AppStateModals, 
    IAppStateSettings, 
    IAppState 
} from "../../types/components/model/AppState";


export class AppState implements IAppState {
    products?: IProductCatalog;

    selectedProduct: IProduct | null = null;
    userOrder: IOrder | null = null;

    openedModal: AppStateModals = AppStateModals.none;
    isOrderReady: boolean = false;
    modalMessage: string | null = null;
    isValidationError: boolean = false;

    private api: ILarekAPI;
    private settings: IAppStateSettings;
    
    //TODO: constructor(api: ILarekAPI, settings: IAppStateSettings) {
    constructor(api: ILarekAPI) {
        this.api = api;

        this.userOrder = {
            items: [],
            total: 0,
            payment: TPaymentType.cash,
            address: '',
            email: '',
            phone: ''
        }
    }

    /*
    loadProducts(): Promise<IProductCatalog> { 
        return this.api.getProducts()
            .then((products) => {
                this.products = products;
                return products
            });
    }*/

    loadProductCatalog(): Promise<IProductCatalog> {
        return this.api.getProducts()
            .then((products) => {
                this.products = products;
                //message to events
                return products;
            });
    }

    placeOrder(order: IOrder): Promise<IOrderResult> {
        return this.api.createOrder(order);
    }

    addToBasket(id: string): void {
        const productDetails = this.products.items.get(id);
        if (productDetails) {
            this.userOrder.items.push(id);
            this.userOrder.total += productDetails.price;
        }
    }

    removeFromBasket(id: string): void {
        const productDetails = this.products.items.get(id);
        const itemIdx = this.userOrder.items.indexOf(id);
        if (itemIdx != -1) {
            this.userOrder.items.splice(itemIdx, 1);
            this.userOrder.total -= productDetails.price;
        }
    }

    getBasketTotal(): number {
        return this.userOrder.items.length;
    }

    getBasketItems(): IProduct[] {
        const basketProducts : IProduct[] = [];
        this.userOrder.items.forEach((itemId) => {
            basketProducts.push(this.products.items.get(itemId));
        })
        return basketProducts;
    }

    fillAddress(address: TPaymentAddress): void {
        this.userOrder.address = address.address;
        this.userOrder.payment = address.payment;        
    }

    fillContacts(contacts: TContacts): void {
        this.userOrder.email = contacts.email;
        this.userOrder.phone = contacts.phoneNumber;
    }

    getOrder(): IOrder {
        return this.userOrder;
    }

    openModal(modal: AppStateModals): void {
        
    }
}