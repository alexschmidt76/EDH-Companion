// node dependencies
const users = require('express').Router();

// import db
const db = require('../models');
const { User } = db;

/* USER INFO ROUTES */

users.get('/', async (req, res) => {
    try {
        const foundUsers = await User.findAll()
        res.json(foundUsers);
    } catch (error) {
        res.status(500).json({
            message: 'Databass error',
            error: error
        });
    }
});

module.exports = users;