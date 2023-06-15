export interface IProduct {
    id?: number;
    sku: string;
    title: string;
    price: number;
    image: string;
    description: string;
    totalSku?: string;
}

export interface CartItem {
    product: IProduct;
    quantity: number;
    totalSku?: string;
}

export interface IProductRules extends IProduct {
    id?: number;
    rules: Array<string>;
    item_sku: string;
}