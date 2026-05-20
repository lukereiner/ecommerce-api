const db = require("../db/myPool");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartItemsModel {
    // create new cart item record
    async create(data) {
        try {
            const statement = pgp.helpers.insert(data, null, "cart_items") + "RETURNING *";

            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;
        } catch (err) {
            throw new Error(err);
        }
    }
}