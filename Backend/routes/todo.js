const express = require('express');
const { query } = require('../helpers/db.js');

const todoRouter = express.Router();

// Define root endpoint
todoRouter.get('/', async (req, res) => {
    try {
        const result = await query('SELECT * FROM task');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST Endpoint ("/new")
todoRouter.post('/new', async (req, res) => {
    try {
        const result = await query('INSERT INTO task (description) VALUES ($1) returning *', [req.body.description]);
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE Endpoint ("/delete/:id")
todoRouter.delete('/delete/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await query('DELETE FROM task WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            console.log(`Task with ID ${id} not found`);
            return res.status(404).json({ error: 'Task not found' });
        } else {
            console.log(`Task with ID ${id} deleted successfully`);
            return res.status(204).end();
        }
    } catch (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



// Error handling for Invalid Endpoints
todoRouter.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = { todoRouter }; // Updated export statement
