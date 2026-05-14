const userRouter = require('./users');

module.exports = (app, passport) => {
    userRouter(app);
}