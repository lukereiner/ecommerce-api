const createError = require("http-errors");
const OrderModel = require("../models/ordersModel");

const OrderModelInstance = new OrderModel();

module.exports = class OrderService {
  // Retrieve all orders from ORDERS table
  async getAllOrders() {
    try {
      const order = await OrderModelInstance.getAllOrders();

      if (!order) {
        throw createError(404, "No orders in database");
      }

      return order;
    } catch (err) {
      throw err;
    }
  };

  
};
