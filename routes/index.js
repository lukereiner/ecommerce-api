const userRouter = require('./users');
const productRouter = require('./products');

module.exports = (app, passport) => {
    userRouter(app);
    productRouter(app);
}