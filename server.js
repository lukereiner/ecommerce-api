const express = require('express')
const app = express()
require('dotenv').config()
const { PORT } = require('./config')

app.get('/', (req, res) => {
    res.send('Hello there!')
})

const startServer = async() => {
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    });
};

startServer();