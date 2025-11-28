// node dependencies
import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import cookieSession from 'cookie-session';

// import controllers
import users from './controllers/users_controller.js';
import auth from './controllers/auth_controller.js';

const app = express();

// express settings
app.use(cookieSession({
    name: 'session',
    sameSite: false,
    httpOnly: true,
    secure: true,
    keys: [process.env.SESSION_SECRET],
    maxAge: 60 * 60 * 24 * 1000 // 24 hours
}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
app.use('/auth', auth);

// start listening for calls
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

// export the Express API for Vercel
module.exports = app;