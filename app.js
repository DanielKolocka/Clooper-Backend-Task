const express = require('express');
const app = express();

const dotenv = require('dotenv');

// Importing DB
const connectDataBase = require('./config/database');

// Security
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
// const hpp = require('hpp');
const cors = require('cors')

// Import Error Handlers
// To Do...

// Setting up config.env file variables
dotenv.config({ path: './config/config.env' });

//Handling uncaught exception
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down due to uncaught exception.');
    process.exit(1);
});

//Connecting to db
connectDataBase();

// Setup security headers (helmet)
app.use(helmet());

//Setup body parser
app.use(express.json());

// Sanitize Data
app.use(mongoSanitize());

// Prevent xss attacks
app.use(xssClean());

// Setup CORS - Accessible by other domains
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: process.env.RATE_LIMITER_TIME * 60 * 1000, //Minutes
    max: process.env.RATE_LIMITER_MAX //Number of requests

});
app.use(limiter);

//importing routes
const properties = require('./routes/properties');
// const users = require('./routes/users');

app.use('/', properties);
// app.use('/', users);

// Handle Unhandled Routes
// To Do...

// Middleware for error handling
// To Do...

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT} in ${process.env.NODE_ENV} mode.`);
});

//Handling unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection.')
    server.close(() => {
        process.exit(1);
    });
});