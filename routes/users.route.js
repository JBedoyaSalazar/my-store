import express from "express";

const router = express.Router();

/**
 * Devuelve los parámetros `id` y `productId` recibidos en la ruta.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {void}
 */
router.get("/:id/products/:productId", (req, res) => {
    const { id, productId } = req.params;
    res.json({
        id,
        productId,
        message: "Recibiendo varios parametros con la misma ruta",
    });
});

export { router };
