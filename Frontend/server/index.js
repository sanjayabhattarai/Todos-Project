const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
const port = 3001;

app.get('/', (req, res) => {
    const pool = openDb();
    pool.query('SELECT * FROM tasks', (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

const openDb = () => {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'root',
        port: 5432,
    });
    return pool;
};

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
