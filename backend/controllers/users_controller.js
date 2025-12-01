// node dependencies
const users = require('express').Router();
const bcrypt = require('bcryptjs');

// import db
const db = require('..models');
const { where } = require('sequelize');
const { User } = db;

/* USER INFO ROUTES */

// get a user by their username
// this route is used to pull up another user's page, so the passwordDigest
// field should not be pulled in the query
users.get('/:username', async (req, res) => {
    try {
        const foundUser = User.findOne({
            where: { 
                username: req.params.username
            },
            attributes: { exclude: ['passwordDigest'] }
        });

        if (!foundUser) {
            res.status(204).json(null)
        }

        res.status(200).json({ user: foundUser });
    } catch (error) {
        res.status(500).json({
            error: {
                error,
                databaseError: true,
                message: "Database error, try again in a few moments."
            }
        });
    }
});

// create a new user
users.post('/', async (req, res) => {
    // get info from post request
    let { password, email, username, ...rest } = req.body;

    // check if a user with this email already exists
    // because the server only wants to know if there is a user with this
    // email or username, no attributes of the user are needed
    let foundUser = null
    try{
        foundUser = await User.findOne({
            where: { email: email },
            attributes: []
        });
    } catch (error) {
        res.status(500).json({
            error: {
                error,
                databaseError: true,
                message: "Database error, try again in a few moments."
            }
        });
    }

    if (foundUser) {
        res.status(403).json({
            error: {
                invalidEmail: true,
                message: 'A user with this email already exists.'
            }
        });
    }

    // check if a user with this username already exists
    try{
        foundUser = await User.findOne({
            where: { username: username },
            attributes: []
        });
    } catch (error) {
        res.status(500).json({
            error: {
                error,
                databaseError: true,
                message: "Database error, try again in a few moments."
            }
        });
    }

    if (foundUser) {
        res.status(403).json({
            error: {
                invalidUsername: true,
                message: "A user with this username already exists."
            }
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
        });

        // do not send passwordDigest to frontend
        delete newUser.passwordDigest;

        res.json({ user: newUser });
    } catch (error) {
        res.status(500).json({
            error: {
                error,
                databaseError: true,
                message: "Database error, try again in a few moments."
            }
        });
    }
});

// send a friend request
users.post('/:username/send-friend-request', async (req, res) => {
    // make sure there is a current user

    // try to add a sent notification to the current user

    // try to add a recieved notification to the user being sent the request
});

// accept a friend request
users.post('/accempt-friend-request', async (req, res) => {
    // make sure there is a current user

    // try to find a friend request notification with provided id

    // add the current user and the requesting user to eachothers' following and followed by fields

    // delete the notification
});

// send a pod join invite

// accept a pod join invite

module.exports = users;