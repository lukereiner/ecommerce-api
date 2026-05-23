const createError = require("http-errors");
const CartModel = require("../models/cartsModel");
const CartItemsModel = require("../models/cartItemsModel");
const ProductModel = require("../models/productsModel");

const CartModelInstance = new CartModel();
const CartItemsModelInstance = new CartItemsModel();
const ProductModelInstance = new ProductModel();

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

      const itemsWithProducts = await CartItemsModelInstance.getCartItemsWithProducts(cart.cartid);

      cart.items = itemsWithProducts;

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

  // CART ITEMS MODEL
  // add items to cart
  async addItems(data) {
    try {
      const itemsToAdd = await CartItemsModelInstance.create(data);

      if (!itemsToAdd) {
        throw createError(404, "No item(s) to add");
      }

      return itemsToAdd;
    } catch (err) {
      throw err;
    }
  }

  // update select items in cart
  async updateItems(data) {
    try {
      const itemsToUpdate = await CartItemsModelInstance.update(data);

      if (!itemsToUpdate) {
        throw createError(404, "Cannot update item");
      }

      return itemsToUpdate;
    } catch (err) {
      throw err;
    }
  }

  // delete select items in cart
  async deleteItems(data) {
    try {
      const itemsToDelete = await CartItemsModelInstance.delete(data);

      if (!itemsToDelete) {
        throw createError(404, "Cannot delete item");
      }

      return itemsToDelete;
    } catch (err) {
      throw err;
    }
  }
};
