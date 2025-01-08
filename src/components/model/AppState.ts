import { 
    TPaymentAddress,
    TContacts,
    IProduct,
    IProductCatalog,
    IOrder,
    IOrderResult,
 } from "../../types/components/model/LarekApi";

import { 
    IAppStateSettings, 
    IAppState, 
    AppStateModals,
    AppStateChanges
} from "../../types/components/model/AppState";


export class AppState implements IAppState {
    products?: IProductCatalog;

    selectedProduct: IProduct | null = null;
    userOrder: IOrder | null = null;
    orderResult: IOrderResult | null = null;

    isOrderReady: boolean = false;
    modalMessage: string | null = null;
    isValidationError: boolean = false;

    private settings: IAppStateSettings;
    
    constructor(settings: IAppStateSettings) {
        this.settings = settings;

        this.userOrder = {
            items: [],
            total: 0,
            payment: null,
            address: '',
            email: '',
            phone: ''
        }
    }

    protected notifyChanged(changed: AppStateChanges, modal?: AppStateModals) {
        this.settings.onChange(changed, modal);        
    }

    openModal(modal: AppStateModals): void {
        this.notifyChanged(AppStateChanges.modal, modal);
    }

    setProductCatalog(products: IProductCatalog): void {
        this.products = products;
        this.notifyChanged(AppStateChanges.catalog);
    }

    selectProduct(id: string | null): void {
        if (!id || this.products.items.has(id)) {
            this.selectedProduct = id ? this.products.items.get(id) : null;
            this.notifyChanged(AppStateChanges.modal, AppStateModals.product);
        } else {
            throw new Error (`Invalid product id: ${id}`);
        }
    }

    addToBasket(id: string): void {
        const productDetails = this.products.items.get(id);
        if (!productDetails) {
            throw new Error (`Invalid product id: ${id}`);
        }
        if (!this.userOrder.items.includes(id)) {
            this.userOrder.items.push(id);
            this.userOrder.total += productDetails.price;
            this.notifyChanged(AppStateChanges.basket);
        }
    }

    removeFromBasket(id: string): void {
        const productDetails = this.products.items.get(id);
        const itemIdx = this.userOrder.items.indexOf(id);
        if (itemIdx != -1) {
            this.userOrder.items.splice(itemIdx, 1);
            this.userOrder.total -= productDetails.price;
            this.notifyChanged(AppStateChanges.basket);
        }
    }

    getBasketTotal(): number {
        return this.userOrder.total;
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
        this.notifyChanged(AppStateChanges.modal, AppStateModals.contacts);     
    }

    fillContacts(contacts: TContacts): void {
        this.userOrder.email = contacts.email;
        this.userOrder.phone = contacts.phoneNumber;
        this.notifyChanged(AppStateChanges.submit)
    }

    getOrder(): IOrder {
        return this.userOrder;
    }

    clearOrder(): void {
        this.userOrder = {
            items: [],
            total: 0,
            payment: null,
            address: '',
            email: '',
            phone: ''
        }
        this.notifyChanged(AppStateChanges.basket);
    }

    setOrderResult(result: IOrderResult): void {
        this.orderResult = result;
        this.clearOrder();
        this.notifyChanged(AppStateChanges.modal, AppStateModals.success);
    }

    clearOrderResult(): void {
        this.orderResult = null;
    }
}