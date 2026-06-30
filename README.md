# my-store

API en Express para un catálogo simple de productos con ejemplos de rutas para usuarios y categorías. El proyecto utiliza datos en memoria, validación con Joi, manejo de errores con Boom y un frontend estático mínimo para consumir la API.

## Objetivo

Mostrar una base funcional de API REST con Express, validación de entradas, CORS restringido a orígenes locales y una capa de servicio separada de las rutas.

## Tecnologías utilizadas

- Node.js
- Express 5
- CORS
- Joi
- @hapi/boom
- @faker-js/faker
- http-server
- ESLint
- Prettier

## Arquitectura observada

El proyecto sigue una separación simple por capas:

- `index.js` crea la aplicación, configura middlewares globales y monta las rutas.
- `routes/` define los endpoints HTTP.
- `services/` concentra la lógica de negocio y el almacenamiento en memoria.
- `schemas/` contiene los esquemas de validación con Joi.
- `middlewares/` agrupa validación y manejo de errores.
- `frontend/` incluye un cliente estático básico para probar la API.

## Estructura de carpetas

- `index.js`: arranque del servidor Express.
- `routes/`: rutas de productos, usuarios y categorías.
- `services/`: servicio de productos con datos generados en memoria.
- `schemas/`: esquemas Joi para productos.
- `middlewares/`: validación y manejo de errores.
- `frontend/`: página estática y script de prueba.
- `eslint.config.js`: configuración de lint.
- `package.json`: scripts, dependencias y metadatos del proyecto.

## Requisitos

- Node.js compatible con módulos ES.
- npm.

## Instalación

```bash
npm install
```

## Variables de entorno

No se requieren variables de entorno para ejecutar el proyecto en su estado actual.

## Scripts disponibles

- `npm start`: ejecuta el servidor con `node index.js`.
- `npm run dev`: ejecuta el servidor con observación de archivos usando `node --watch index.js`.
- `npm run lint`: valida el código con ESLint.
- `npm run lint:fix`: ejecuta ESLint con corrección automática.
- `npm run format`: formatea el proyecto con Prettier.
- `npm run format:check`: verifica el formato con Prettier sin modificar archivos.
- `npm run frontend`: sirve la carpeta `frontend/` en el puerto `5050` con `http-server`.
- `npm test`: script de marcador que actualmente finaliza con error porque no hay pruebas definidas.

## Cómo ejecutar el proyecto

Servidor API:

```bash
npm run dev
```

Cliente estático opcional:

```bash
npm run frontend
```

El servidor Express escucha en `http://localhost:3000`.

## Flujo general de la API

1. `index.js` inicia Express, habilita `express.json()` y configura CORS con una lista blanca para `http://localhost:8080` y `http://localhost:5050`.
2. Se expone una ruta raíz `GET /` con un mensaje HTML simple.
3. `routerApi(app)` monta la API bajo `/api/v1`.
4. Las rutas de productos usan validación Joi y un servicio en memoria.
5. Los errores pasan por `logErrors`, `boomErrorHandler` y `errorHandler`.

## Endpoints observados

### Productos

- `GET /api/v1/products`: retorna la lista completa de productos generados en memoria. La respuesta se retrasa 5 segundos de forma intencional en el servicio.
- `GET /api/v1/products/:id`: valida el parámetro `id` como UUID, busca un producto y puede responder con `Product not found` o `Product is blocked`.
- `POST /api/v1/products`: crea un producto con `name`, `price` e `image`.
- `PATCH /api/v1/products/:id`: actualiza parcialmente un producto existente.
- `DELETE /api/v1/products/:id`: elimina un producto existente.

### Usuarios

- `GET /api/v1/users/:id/products/:productId`: devuelve los parámetros recibidos y un mensaje descriptivo.

### Categorías

- `GET /api/v1/categories`: lee `limit` y `offset` desde query string. Si ambos existen, los devuelve en JSON; en caso contrario, responde con un texto informativo.

## Middlewares implementados

- `express.json()`: habilita parsing de JSON en el cuerpo de las peticiones.
- `cors(options)`: permite solo los orígenes definidos en la lista blanca local.
- `validatorHandler(schema, property)`: valida `params` o `body` con Joi y detiene la petición con un error 400 si falla.
- `logErrors`: registra el error en consola.
- `boomErrorHandler`: transforma errores de Boom en respuestas HTTP usando el payload estándar de la librería.
- `errorHandler`: responde errores no controlados con estado 500, mensaje y stack.

## Validaciones con Joi

El proyecto valida productos con estos contratos:

- `id`: UUID obligatorio.
- `name`: string entre 3 y 30 caracteres.
- `price`: número entero mínimo 10.
- `image`: URL válida.
- `isBlocked`: booleano.

Se usan tres esquemas:

- Creación: `name`, `price` e `image` obligatorios.
- Actualización: campos opcionales `name`, `price`, `image` e `isBlocked`.
- Parámetros: `id` obligatorio en rutas que reciben identificador.

## Manejo de errores

La capa de servicio usa Boom para errores de negocio:

- `404 Not Found` cuando el producto no existe.
- `409 Conflict` cuando el producto está bloqueado.

El middleware de errores convierte los fallos en respuestas JSON y deja el `stack` disponible en la respuesta genérica del manejador final.

## CORS

La política CORS acepta solicitudes sin `origin` y solicitudes originadas desde:

- `http://localhost:8080`
- `http://localhost:5050`

## Dependencias principales y propósito

- `express`: servidor HTTP y sistema de rutas.
- `cors`: control de acceso entre orígenes.
- `joi`: validación de datos de entrada.
- `@hapi/boom`: errores HTTP estructurados.
- `@faker-js/faker`: generación de productos falsos en memoria.
- `http-server`: servidor estático para la carpeta `frontend`.
- `eslint` y `prettier`: calidad y formato del código.

## Recomendaciones futuras

Estas ideas no están implementadas actualmente y se listan solo como posibles mejoras:

- Agregar pruebas automatizadas para rutas, validaciones y servicio.
- Persistir los productos en una base de datos en lugar de memoria.
- Externalizar el puerto y la lista blanca de CORS a variables de entorno.
- Unificar las respuestas de los endpoints para que compartan un formato más consistente.

## Licencia

MIT.
