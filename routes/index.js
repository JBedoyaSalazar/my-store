import {router as ProductsRouter} from './products.route.js';
import {router as UsersRouter} from './users.route.js';
import {router as CategoriesRouter} from './categories.route.js';

export function routerApi(app){
    app.use('/products', ProductsRouter);
    app.use('/users', UsersRouter);
    app.use('/categories', CategoriesRouter);
}
