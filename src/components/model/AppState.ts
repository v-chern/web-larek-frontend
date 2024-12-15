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
        //super();
        this.api = api;

        this.userOrder = {
            items: [],
            itemsCount: 0,
            totalSum: 0,
            paymentType: null,
            deliveryAddress: '',
            email: '',
            phoneNumber: ''
        }
    }

    loadProducts(): Promise<IProductCatalog> { 
        return this.api.getProducts()
            .then((products) => {
                this.products = products;
                return products
            });
    }

    placeOrder(order: IOrder): Promise<IOrderResult> {
        const testOrder = {
            "payment": "online",
            "email": "test@test.ru",
            "phone": "+71234567890",
            "address": "Spb Vosstania 1",
            "total": 2200,
            "items": [
                "854cef69-976d-4c2a-a18c-2aa45046c390",
                "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
            ]
        };
        return this.api.createOrder(testOrder);
    }

    setProductCatalog(products: IProductCatalog): void {
        this.products = products;
        //message to events
    }

    addToBasket(id: string): void {
        const productDetails = this.products.items.get(id);
        if (productDetails) {
            this.userOrder.items.push(id);
            this.userOrder.itemsCount += 1;
            this.userOrder.totalSum += productDetails.price;
        }
    }

    removeFromBasket(id: string): void {
        const productDetails = this.products.items.get(id);
        const itemIdx = this.userOrder.items.indexOf(id);
        if (itemIdx != -1) {
            this.userOrder.items.splice(itemIdx, 1);
            this.userOrder.itemsCount -= 1;
            this.userOrder.totalSum -= productDetails.price;
        }
    }

    getBasketTotal(): number {
        return this.userOrder.itemsCount;
    }

    getBasketItems(): IProduct[] {
        const basketProducts : IProduct[] = [];
        this.userOrder.items.forEach((itemId) => {
            basketProducts.push(this.products.items.get(itemId));
        })
        return basketProducts;
    }

    fillAddress(address: TPaymentAddress): void {
        
    }

    fillContacts(contats: TContacts): void {
        
    }

    getOrder(): IOrder {
        return this.userOrder;
    }

    openModal(modal: AppStateModals): void {
        
    }
}