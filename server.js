const express = require('express')
const app = express()
require('dotenv').config()
const { PORT } = require('./config')
const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')

app.use(express.json());
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.get('/', (req, res) => {
    res.send('Hello there!')
})

const startServer = async() => {
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    });
};

startServer();