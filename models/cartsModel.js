const db = require("../db/myPool");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartModel {
    // create new cart
    async create(userId) {
        try {
            const statement = `
            INSERT INTO carts (userid)
            VALUES ($1)
            RETURNING cartid, userid, created, modified
            `;

            const result = await db.query(statement, [userId]);

            if (result.rows?.length) {
                return result.rows[0]
            }

            return null;
        } catch (err) {
            throw new Error(err);
        }
    }

    // find cart by userID
    async getCartUser(userId) {
        try {
            const statement = "SELECT * FROM carts WHERE userid = $1"
            const values = [userId];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.row[0]
            }

            return null;
        } catch (err) {
            throw new Error(err);
        }
    }

    // find cart by cartID
    async getCartId(id) {
        try {
            const statement = "SELECT * FROM carts WHERE cartid = $1";
            const values = [id];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch (err) {
            throw new Error(err);
        }
    }
}

// POST /cart/{id}/items - will add when cart_items table routes are being written