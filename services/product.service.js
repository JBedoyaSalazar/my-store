import { faker } from "@faker-js/faker";
import boom from "@hapi/boom";

/**
 * Servicio en memoria para administrar productos de ejemplo.
 */
export class ProductsService {
    /**
     * Inicializa la colección y genera productos sintéticos.
     */
    constructor() {
        this.products = [];
        this.generate();
    }

    /**
     * Genera productos falsos y los agrega a la colección interna.
     *
     * @returns {void}
     */
    generate() {
        const limit = 100;

        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseFloat(faker.commerce.price()),
                image: faker.image.url(),
                isBlocked: faker.datatype.boolean(),
            });
        }
    }

    /**
     * Crea un producto nuevo en memoria.
     *
     * @param {{ name: string, price: number, image: string }} data - Datos del producto.
     * @returns {Promise<{ id: string, name: string, price: number, image: string }>} Producto creado.
     */
    async create(data) {
        const newProduct = {
            id: faker.string.uuid(),
            ...data,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    /**
     * Retorna la colección completa de productos con una demora artificial.
     *
     * @returns {Promise<Array<object>>} Lista de productos en memoria.
     */
    async find() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.products);
            }, 5000);
        });
    }

    /**
     * Busca un producto por identificador y valida su estado.
     *
     * @param {string} id - Identificador del producto.
     * @returns {Promise<object>} Producto encontrado.
     * @throws {Error} Cuando el producto no existe o está bloqueado.
     */
    async findOne(id) {
        const product = this.products.find((product) => product.id === id);

        if (!product) {
            throw boom.notFound("Product not found");
        }

        if (product.isBlocked) {
            throw boom.conflict("Product is blocked");
        }

        return product;
    }

    /**
     * Actualiza parcialmente un producto existente.
     *
     * @param {string} id - Identificador del producto.
     * @param {Partial<{ name: string, price: number, image: string, isBlocked: boolean }>} data - Datos a combinar.
     * @returns {Promise<object>} Producto actualizado.
     * @throws {Error} Cuando el producto no existe.
     */
    async update(id, data) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...data };
            return this.products[productIndex];
        }
        throw boom.notFound("Product not found");
    }

    /**
     * Elimina un producto existente de la colección.
     *
     * @param {string} id - Identificador del producto.
     * @returns {Promise<object>} Producto eliminado.
     * @throws {Error} Cuando el producto no existe.
     */
    async delete(id) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            return this.products.splice(productIndex, 1)[0];
        }
        throw boom.notFound("Product not found");
    }
}
