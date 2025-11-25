// node dependencies
const bcrypt = require('bcryptjs');
const auth = require('express').Router();
const { Op } = require('sequelize');

// import db
const User = require('../models/user');

// authenticate user log in
auth.post('/', async (req, res) => {
    // find user with matching email/username
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: req.body.username }, 
                { username: req.body.username }
            ]
        },
        attributes: ['passwordDigest']
    });

    if (!user) {
        res.status(404).json({
            error: {
                invalidUsername: true,
                message: 'An account with this username/email does not exist.'
            }
        });
    } 
    
    if (!await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            error: {
                invalidCredentials: true,
                message: 'Incorrect Password'
            }
        })
    }
    
    // TO DO: sign in user to session here
    res.status(200).json({ user });
})