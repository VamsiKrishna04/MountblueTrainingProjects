const express = require('express');

const app = express();

const log = require('./src/utils/logger');

// Middleware Function
const logger = (req, res, next) => {
  log.info(req.originalUrl + ' ' + req.method);
  next();
};

app.use(logger);
// Body Parser Middleware
// To handle raw json
app.use(express.json());
// to handle form submission
// app.use(express.urlencoded({ extended: false }));


// Cars API routes
app.use('/api/cars', require('./routes/cardetails'));

// Customers API routes
app.use('/api/customers', require('./routes/customerdetails'));

// User API routes
app.use('/api/users', require('./routes/userdetails'));

// Error Handling Middleware
app.use(function (err, req, res, next) {
  log.error(err.message);
  res.status(442).send({ err: err.message });
});

const PORT = 5000;

app.listen(PORT, () => console.log('Server started on PORT  5000'));

module.exports = express;
