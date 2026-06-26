const userRouter = require('./users');
const productRouter = require('./products');
const cartRouter = require('./carts');
const orderRouter = require('./orders');

module.exports = (app, passport) => {
    userRouter(app);
    productRouter(app);
    cartRouter(app);
    orderRouter(app);
}