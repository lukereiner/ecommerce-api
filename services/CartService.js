const createError = require("http-errors");
const CartModel = require("../models/cartsModel");
const CartModelInstance = new CartModel();

module.exports = class CartService {
  async create(userId) {
    try {
      const cart = await CartModelInstance.create(userId);

      if (!cart) {
        throw createError(404, "No cart in database");
      }

      return cart;
    } catch (err) {
      throw err;
    }
  }

  async getCartByUser(userId) {
    try {
      const cart = await CartModelInstance.getCartUser(userId);

      if (!cart) {
        throw createError(404, "No cart for this user");
      }

      return cart;
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
