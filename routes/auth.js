const express = require("express");
const router = express.Router();
const AuthService = require('../services/AuthService')
const AuthServiceInstance = new AuthService();

module.exports = (app) => {
    app.use(express.json());
    app.use("/auth", router);

    router.get("/", async (req, res, next) => {
        try {
            const response = 'You hit auth!';
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    });

    router.post('/register', async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // Check if email and password were provided
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required!" });
            }

            const newUser = await AuthServiceInstance.register({email, password});

            // Created HTTP response
            return res.status(201).json({
                message: "User created successfully!"
            })
        } catch (err) {
            next(err);
        }
    })
}