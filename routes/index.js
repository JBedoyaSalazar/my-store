import { router as ProductsRouter } from "./products.route.js";
import { router as UsersRouter } from "./users.route.js";
import { router as CategoriesRouter } from "./categories.route.js";
import express from "express";

/**
 * Monta los routers de la API bajo el prefijo `/api/v1`.
 *
 * @param {import('express').Express} app - Instancia principal de Express.
 * @returns {void}
 */
export function routerApi(app) {
    const router = express.Router();

    app.use("/api/v1", router);
    router.use("/products", ProductsRouter);
    router.use("/users", UsersRouter);
    router.use("/categories", CategoriesRouter);
}
