// node dependencies
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

// import controllers
import users from './controllers/users_controller.js';

const app = express();

// express settings
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.use('/users', users);
//app.use('/auth', require('./controllers/auth_controller'));

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

// export the Express API for Vercel
module.exports = app;