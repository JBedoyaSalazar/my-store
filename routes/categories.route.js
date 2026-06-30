import express from "express";

const router = express.Router();

/**
 * Devuelve `limit` y `offset` cuando ambos llegan como query params.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {void}
 */
router.get("/", (req, res) => {
    const { limit, offset } = req.query;

    if (limit && offset) {
        res.json({
            limit,
            offset,
        });
    } else {
        res.send("No se recibieron parametros tipo query");
    }
});

export { router };
