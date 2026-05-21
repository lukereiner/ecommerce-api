const userRouter = require('./users');
const productRouter = require('./products');
const cartRouter = require('./carts')

module.exports = (app, passport) => {
    userRouter(app);
    productRouter(app);
    cartRouter(app);
}