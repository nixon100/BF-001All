const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Load environment variables
dotenv.config();

const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles'); // Roles Router
const productRouter = require('./routes/product');
const priceRouter = require('./routes/price');
const vendorRouter = require('./routes/vendor');
const app = express();

// Connect to the database
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit the process if the database connection fails
    });

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Basic route to check server status
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date()
    });
});

// API Routes
app.use('/api/v1/users', usersRouter); 
app.use('/api/v1/roles', rolesRouter); 
app.use('/api/v1/product', productRouter);
app.use('/api/v1/price', priceRouter); 
app.use('/api/v1/vendor', vendorRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404, `The route ${req.originalUrl} was not found.`));
});

// Error handler
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message,
        status: statusCode,
        stack: req.app.get('env') === 'development' ? err.stack : {}, // Show stack trace only in development
    });
});

// Export app
module.exports = app;
