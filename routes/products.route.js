import express from "express";
import { faker } from "@faker-js/faker";

const router = express.Router()

router.get("/", (req, res) => {
    const products = [];
    const { size } = req.query;
    const limit = size || 10;

    for (let i = 0; i < limit; i++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
            image: faker.image.url(),
        });
    }

    res.json(products);
});

router.get("/filter", (req, res) => {
    res.send("Yo soy un filter");
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    if(id === "999"){
        res.status(404).json({
            message: "Product not found"
        });
    }else {
        res.json({
            message: "Product found",
            price: "Simulated price",
            id
        });
    }
});

router.post("/", (req, res) => {
    const {name, price, image} = req.body;
    res.status(201).json({
        message: "Product created",
        data: {
            id: faker.number.int(),
            name,
            price,
            image
        },
    })
})

router.patch("/:id", (req, res) => {
    const { id } = req.params
    const body = req.body;
    res.json({
        message: "Product updated",
        data: body,
        id
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    res.json({
        message: "Product deleted",
        id
    })
})

export  {router};
