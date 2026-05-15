const createError = require("http-errors");
const ProductModel = require("../models/productsModel");
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
  async findAll() {
    try {
      const products = await ProductModelInstance.findAll();

      if (!products) {
        throw createError(404, "No products in database");
      }

      return products;
    } catch (err) {
      throw err;
    }
  }
};
