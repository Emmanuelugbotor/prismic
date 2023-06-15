import { IProduct } from "../interface/product";
import APIClient from "./api-client";
  

export default class ProductService {

    async getAllProducts() {
        const data =await new APIClient('/data').getAll().then((response) => response)
        return data;
    }
    postProducts(product: IProduct) {
        const data = new APIClient('/data').post(product);
        return data;
    }
}