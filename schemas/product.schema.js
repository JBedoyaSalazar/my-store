import Joi from "joi";

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(30);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const isBLocked = Joi.boolean();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required(),
});

const updateProductSchema = Joi.object({
    name,
    price,
    image,
    isBLocked,
});

const getProductSchema = Joi.object({
    id: id.required(),
});

export { createProductSchema, updateProductSchema, getProductSchema };
