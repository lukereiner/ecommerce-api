const express = require("express");
const router = express.Router();
const CartItemsService = require("../services/CartItemsService");

const CartItemsServiceInstance = new CartItemsService();

module.exports = (app) => {
      app.use(express.json());
      app.use("/users", router);

      
}