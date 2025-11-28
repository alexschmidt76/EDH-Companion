// node dependencies
const bcrypt = require('bcryptjs');
const auth = require('express').Router();
const { Op } = require('sequelize');

// import db
const User = require('../models/user');

// authenticate user log in
auth.post('/log-in', async (req, res) => {
    // find user with matching email/username in db
    let foundUser;
    try {
        foundUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.username }, 
                    { username: req.body.username }
                ]
            }
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

    // confirm a user was found
    if (!foundUser) {
        res.status(404).json({
            error: {
                invalidCredentials: true,
                message: 'There is no account with this combination of username/email and password.'
            }
        });
    } 
    
    if (!await bcrypt.compare(req.body.password, foundUser.passwordDigest)) {
        res.status(404).json({
            error: {
                invalidCredentials: true,
                message: 'There is no account with this combination of username/email and password.'
            }
        })
    }

    // log user in
    req.session.userId = foundUser.id;
    res.status(200).json({ user: foundUser });
});

// log user out
auth.post('/log-out', async (req, res) => {
    if (req.body.userId && req.body.userId === req.session.userId) {
        req.session.userId = null;
        res.status(200).json({
            message: 'User signed out.'
        });
    }

    res.status(401).json({
        message: 'No user signed out.'
    });
});

// get the current signed-in user
auth.get('/current-user', async (req, res) => {
    if (req.session.userId) {
        try {
            const user = await User.findOne({
                where: { id: req.session.userId }
            });
    
            if (user) res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                error: {
                    error,
                    databaseError: true,
                    message: "Database error, try again in a few moments."
                }
            });
        }
    }

    res.status(204).json(null);
})