const userRouter = require('./users');
const productRouter = require('./products');
const cartRouter = require('./carts')
const cartItemsRouter = require('./cart_items');

module.exports = (app, passport) => {
    userRouter(app);
    productRouter(app);
    cartRouter(app);
    cartItemsRouter(app);
}