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
    IAppState, 
    AppStateChanges
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
    
    constructor(api: ILarekAPI, settings: IAppStateSettings) {
    //constructor(api: ILarekAPI) {
        this.api = api;
        this.settings = settings;

        this.userOrder = {
            items: [],
            total: 0,
            payment: TPaymentType.cash,
            address: '',
            email: '',
            phone: ''
        }
    }

    protected notifyChanged(changed: AppStateChanges) {
        this.settings.onChange(changed);        
    }

    loadProductCatalog(): Promise<void> {
        return this.api.getProducts()
            .then((products) => {
                this.products = products;
                this.notifyChanged(AppStateChanges.catalog);
            });
    }

    placeOrder(order: IOrder): Promise<IOrderResult> {
        return this.api.createOrder(order);
    }

    selectProduct(id: string | null): void {
        if (!id || this.products.items.has(id)) {
            this.selectedProduct = id ? this.products.items.get(id) : null;
            //this.notifyChanged(AppStateChanges.product)
        } else {
            throw new Error (`Invalid product id: ${id}`);
        }
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
        if (this.openedModal !== modal) {
            this.openedModal = modal;
            this.notifyChanged(AppStateChanges.modal);
        }
    }
}