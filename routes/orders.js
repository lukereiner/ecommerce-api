const express = require("express");
const router = express.Router();
const OrderService = require("../services/OrderService");

const OrderServiceInstance = new OrderService();

module.exports = (app) => {
  app.use(express.json());
  app.use("/orders", router);

  router.get("/", async (req, res) => {
    try {
      const response = await OrderServiceInstance.getAllOrders();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/user/:userId", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const data = { ...req.body, userId, paymentInfo };
    } catch (err) {
        next(err)
    }
  })
};
