import express from "express";
import { ProductsService } from "../services/product.service.js";
import { validatorHandler } from "../middlewares/validator.handler.js";
import {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
} from "../schemas/product.schema.js";

const productsService = new ProductsService();
const router = express.Router();

/**
 * Obtiene la colección completa de productos desde el servicio en memoria.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
router.get("/", async (req, res) => {
    const products = await productsService.find();
    res.json(products);
});

/**
 * Obtiene un producto por identificador y devuelve un mensaje de confirmación con los datos.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función para delegar errores.
 * @returns {Promise<void>}
 */
router.get("/:id", validatorHandler(getProductSchema, "params"), async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productsService.findOne(id);
        res.json({
            message: "Product retrieved",
            data: product,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Crea un producto nuevo en la colección en memoria.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
router.post("/", validatorHandler(createProductSchema, "body"), async (req, res) => {
    const { name, price, image } = req.body;
    const newProduct = await productsService.create({ name, price, image });
    res.status(201).json({
        message: "Product created",
        data: newProduct,
    });
});

router.patch(
    "/:id",
    validatorHandler(getProductSchema, "params"),
    validatorHandler(updateProductSchema, "body"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const updatedProduct = await productsService.update(id, body);
            res.json({
                message: "Product updated",
                data: updatedProduct,
            });
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Elimina un producto existente por identificador.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función para delegar errores.
 * @returns {Promise<void>}
 */
router.delete("/:id", validatorHandler(getProductSchema, "params"), async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productsService.delete(id);
        res.json({
            message: "Product deleted",
            data: deletedProduct,
        });
    } catch (error) {
        next(error);
    }
});

export { router };
