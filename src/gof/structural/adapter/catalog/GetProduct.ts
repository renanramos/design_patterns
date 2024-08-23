import Product from "./Product";
import ProductRepository from "./ProductRepository";

export default class GetProducts {

    constructor(readonly productRepository: ProductRepository) {

    }


    async execute(productId: number): Promise<Output> {
        const product = await this.productRepository.getById(productId);
        return {
            productId: product.productId,
            description: product.description,
            price: product.price
        }
    }
}

type Output = {
    productId: number,
    description: string,
    price: number
}