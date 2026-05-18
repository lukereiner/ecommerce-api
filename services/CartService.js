const createError = require("http-errors");
const CartModel = require("../models/cartsModel");
const CartModelInstance = new CartModel();

module.exports = class CartService {
  async create() {
    try {
      const carts = await CartModelInstance.create();

      if (!carts) {
        throw createError(404, "No carts in database");
      }

      return carts;
    } catch (err) {
      throw err;
    }
  }

  async getCartById(data) {
    const { id } = data;

    try {
      const cartId = await CartModelInstance.getCartId(id);

      if (!cartId) {
        throw createError(404, "Cart not found");
      }

      return cartId;
    } catch (err) {
      throw err;
    }
  }
};
