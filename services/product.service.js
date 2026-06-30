import { faker } from "@faker-js/faker";

export class ProductsService {

    constructor(){
        this.products = []
        this.generate();
    }

    generate(){
        const limit = 100;

        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseFloat(faker.commerce.price()),
                image: faker.image.url(),
            });
        }
    }

    async create(data){
        const newProduct = {
            id: faker.string.uuid(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async find(){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.products);
            }, 5000);
        });
    }

    async findOne(id){
        return this.products.find(product => product.id === id);
    }

    async update(id, data){
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...data };
            return this.products[productIndex];
        }
        throw new Error("Product not found");
    }

    async delete(id){
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            return this.products.splice(productIndex, 1)[0];
        }
        throw new Error("Product not found");
    }
}
