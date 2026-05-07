const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello there!')
})

const startServer = async() => {
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    });
};

startServer();