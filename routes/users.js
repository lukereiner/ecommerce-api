const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const queryText = 'SELECT * FROM users WHERE id = $1';
        const values = [userId];

        const result = await pool.query(queryText, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    // 1. Filter out keys that are null, undefined, or empty strings
    const keys = Object.keys(updates).filter(
        (key) => updates[key] !== undefined && updates[key] !== null && updates[key] !== ''
    );

    if (keys.length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    // 2. Build the SET clause: "password = $1, email = $2..."
    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    
    // 3. Collect the values in the same order as the keys
    const values = keys.map((key) => updates[key]);

    try {
        // 4. Add the ID as the final parameter for the WHERE clause
        values.push(id);
        const query = `UPDATE users SET ${setClause} WHERE id = $${values.length} RETURNING *`;

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;