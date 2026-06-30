import boom from '@hapi/boom';

export function validatorHandler(schema, property) {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            boom.badRequest(error);
        }
        next();
    };
}
