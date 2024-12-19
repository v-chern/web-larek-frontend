import {Api, ApiListResponse} from '../base/api'
import { IProductCatalog, IProduct, IOrderResult, ILarekAPI, IOrder } from '../../types/components/model/LarekApi';

export class LarekApi extends Api implements ILarekAPI {
    constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

    getProducts(): Promise<IProductCatalog> {
           return this.get('/product').then((data: ApiListResponse<IProduct>) => {
            const itemsMap = new Map<string, IProduct>(
                data.items.map((item) => [item.id, item])
            );
    
            return {
                items: itemsMap,
                itemsCount: data.items.length
            };
        })
    }

    getProductDetails(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`)
            .then((data: IProduct) => {
                return data;
            })
    }

    createOrder(order: IOrder): Promise<IOrderResult> {
        return this.post(`/order`, order) as Promise<IOrderResult>;
    }
}
