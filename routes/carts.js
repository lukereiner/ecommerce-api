const express = require("express");
const router = express.Router();
const CartService = require("../services/CartService");

const CartServiceInstance = new CartService();

module.exports = (app) => {
  app.use(express.json());
  app.use("/carts", router);

  router.post("/", async (req, res, next) => {
    try {
      const response = await CartServiceInstance.create();
      res.status(201).send(response);
    } catch (err) {
      next(err);
    }
  });
};
