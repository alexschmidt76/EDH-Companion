// node dependencies
const users = require('express').Router();
const bcrypt = require('bcryptjs');

// import db
import { prisma } from '../prisma/prisma';
const { User } = prisma;

/* USER INFO ROUTES */

users.get('/', async (req, res) => {
    try {
        const foundUsers = await User.findMany();
        res.json(foundUsers);
    } catch (error) {
        res.status(500).json({
            message: 'Databass error',
            error: error
        });
    }
});

// create a new user
users.post('/', async (req, res) => {
    // get info from post request
    let { password, email, username, ...rest } = req.body;

    // check if a user with this email already exists
    let foundUser = await User.findUnique({
        where: {
            email: email
        }
    });

    if (foundUser) {
        res.status(403).json({
            message: "A user with this email already exists.",
            error: "invalid email"
        });
    }

    // check if a user with this username already exists
    foundUser = await User.findUnique({
        where: {
            username: username
        }
    });

    if (foundUser) {
        res.status(403).json({
            message: "A user with this username already exists.",
            error: "invalid username"
        })
    }

    // if no user with this email or username exists, 
    // try to create a new user with the provided data
    try {
        const newUser = await User.create({
            data: {
                ...rest,
                email,
                username,
                passwordDigest: await bcrypt.hash(password, 10)
            }
        })
        res.json(newUser);
    } catch (error) {
        res.status(500).json({
            message: "Database error, user not created.",
            error: error
        });
    }
});

module.exports = users;