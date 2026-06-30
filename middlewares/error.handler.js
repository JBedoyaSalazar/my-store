/**
 * Registra errores no controlados en la consola y delega al siguiente middleware.
 *
 * @param {Error} err - Error capturado por Express.
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función para continuar la cadena de middlewares.
 * @returns {void}
 */
export function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}

/**
 * Responde con un error HTTP genérico cuando el fallo no corresponde a Boom.
 *
 * @param {Error} err - Error capturado por Express.
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} _next - Función para continuar la cadena de middlewares.
 * @returns {void}
 */
export function errorHandler(err, req, res, _next) {
    res.status(500).json({
        error: err.message,
        stack: err.stack,
    });
}

/**
 * Traduce errores creados con Boom a la respuesta estándar de la librería.
 *
 * @param {Error & { isBoom?: boolean, output?: { statusCode: number, payload: unknown } }} err - Error a evaluar.
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función para continuar la cadena de middlewares.
 * @returns {void}
 */
export function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        next(err);
    }
}
