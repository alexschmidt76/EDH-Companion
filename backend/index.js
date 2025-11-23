// node dependencies
require('dotenv').config();

const express = require('express');
const app = express();

// define port
const PORT = process.env.PORT || 3000;

/* CONTROLLERS AND ROUTES */

// landing page route
app.get('/', (req, res) => {
    res.json({
        message: 'You have reached the EDH Companion backend API'
    });
});

// controllers
app.use('/users', require('./controllers/users_controller'));
//app.use('/auth', require('./controllers/auth_controller'));

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

// export the Express API for Vercel
module.exports = app;