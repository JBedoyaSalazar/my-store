import express from "express";

const router = express.Router();

router.get("/:id/products/:productId", (req, res) => {
    const { id, productId } = req.params;
    res.json({
        id,
        productId,
        message: "Recibiendo varios parametros con la misma ruta",
    });
});

export { router };
