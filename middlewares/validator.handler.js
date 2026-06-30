import boom from '@hapi/boom';

export function validatorHandler(schema, property) {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            return next(boom.badRequest(error.details[0].message));
        }
        next();
    };
}
