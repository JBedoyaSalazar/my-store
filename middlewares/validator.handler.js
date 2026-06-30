import boom from "@hapi/boom";

/**
 * Crea un middleware que valida una propiedad de la petición contra un esquema Joi.
 *
 * @param {import('joi').Schema} schema - Esquema de validación.
 * @param {"body" | "params" | "query"} property - Propiedad de la petición a validar.
 * @returns {import('express').RequestHandler} Middleware de validación.
 * @example
 * router.post("/", validatorHandler(createProductSchema, "body"), handler);
 */
export function validatorHandler(schema, property) {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            return next(boom.badRequest(error.details[0].message));
        }
        next();
    };
}
