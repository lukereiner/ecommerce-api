const express = require("express");
const router = express.Router();
const CartService = require("../services/CartService");

const CartServiceInstance = new CartService();

module.exports = (app) => {
  app.use(express.json());
  app.use("/carts", router);

  router.post("/mine", async (req, res, next) => {
    try {
      const { userId } = req.body;

      const response = await CartServiceInstance.create(userId);
      res.status(201).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/mine", async (req, res, next) => {
    try {
      const { userId } = req.body; // this will change to use auth so other user's carts cannot by viewed by anyone - this doesn't work bc body is data to be sent. Needs to be cleaned up in three files for when auth is added

      const response = await CartServiceInstance.getCartByUser(userId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await CartServiceInstance.getCartById({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  // CART ITEMS MODEL
  router.post("/mine/items", async (req, res, next) => {
    try {
      const data = req.body;

      // Passing as a clean object
      const response = await CartServiceInstance.addItems(data);

      res.status(201).send(response);
    } catch (err) {
      res.status(400).send('The provided Cart ID or Product ID does not exist.')
      next(err);
    }
  });

  router.patch("/mine/items/:cartItemId", async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const data = req.body;

      const response = await CartServiceInstance.updateItems({ cartItemId, ...data })
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  })

  router.delete("/mine/items/:cartItemId", async (req, res, next) => {
    const { cartItemId } = req.params;
    try {
      const response = await CartServiceInstance.deleteItems({cartItemId});
      res.status(204).send(response);
    } catch (err) {
      next(err);
    }
  })
};
