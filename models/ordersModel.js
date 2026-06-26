const db = require("../db/myPool");
const pgp = require("pg-promise")({ capSQL: true });
const OrderItem = require('./orderItemsModel');

module.exports = class OrderModel {
  constructor(data = {}) {
    this.items = data.items || [];
    this.status = data.status || "PENDING";
    this.total = data.totalPrice || 0;
    this.userid = data.userId || null;
  }

  addItems(items) {
    this.items = items.map(item => new OrderItem(item));
  }

  // Retrieve all orders
  async getAllOrders() {
    try {
      const statement = "SELECT * FROM orders";

      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows;
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  // create order from checkout
  async createOrder() {
    try {
      const { items, ...order } = this;

      const statement =
        pgp.helpers.insert(order, null, "orders") + " RETURNING*";

      const result = await db.query(statement);

      if (result.rows?.length) {
        Object.assign(this, result.rows[0]);
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Update order from checkout
  async update(data) {
    try {
      console.log("Logging update data from orders model:", data);
      const condition = pgp.as.format("WHERE userid = ${id} RETURNING *", {
        id: this.userid,
      });
      const statement = pgp.helpers.update(data, null, "orders") + condition;

      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
