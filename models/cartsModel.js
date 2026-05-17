const db = require("../db/myPool");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartModel {
    // create new cart
    async create() {
        try {
            const statement = "INSERT INTO carts DEFAULT VALUES RETURNING id, created, modified";

            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0]
            }

            return null;
        } catch (err) {
            throw new Error(err);
        }
    }
}

// POST /cart, POST /cart/{id}, GET /cart/{id}