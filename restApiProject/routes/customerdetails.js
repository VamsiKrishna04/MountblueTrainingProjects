const Joi = require('@hapi/joi');

const express = require('express');

const router = express.Router();

const customerdetails = require('../db/customerdetails');

// Middleware Function
const checkAuth = require('../middleware/check-auth');

// To get all customer details
router.get('', (req, res, next) => {
  customerdetails.selectAllCustomers()
    .then((result) => res.json(result.rows))
    .catch(next);
});

// Get the Customer with given ID
router.get('/:personid', (req, res, next) => {
  const personId = req.params.personid;
  customerdetails.customerWithId(personId)
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(400).json({ msg: `No customer with id ${personId}` });
      }
    }).catch(next);
});

// Validate Customer using Joi
function validateCustomer(customer) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).max(50).required(),
    gender: Joi.string().pattern(/^(?:m|M|male|Male|f|F|female|Female)$/),
    name: Joi.string().min(3).max(50).required(),
    phonenum: Joi.string().min(10).max(20).pattern(/^[0-9]*$/m),
    carid: Joi.number().integer().min(1).required(),
    country: Joi.string().pattern(/^(?:China|United States|Nepal|Thailand|South Africa|New Zealand|United Kingdom|Bangladesh|Australia|India)$/),
    jobtitle: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(customer);
}

// Insert a new customer
router.post('/', checkAuth, (req, res, next) => {
  const newCustomer = {
    email: req.body.email,
    gender: req.body.gender,
    name: req.body.name,
    phonenum: req.body.phonenum,
    carid: req.body.carid,
    country: req.body.country,
    jobtitle: req.body.jobtitle,
  };

  const { error } = validateCustomer(newCustomer);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  customerdetails.createNewCustomer(newCustomer)
    .then(() => res.json(newCustomer))
    .catch(next);
});

// Update Existing Customer
router.put('/:personid', checkAuth, (req, res, next) => {
  const personId = req.params.personid;

  const updatedCustomerDetails = {
    email: req.body.email,
    gender: req.body.gender,
    name: req.body.name,
    phonenum: req.body.phonenum,
    carid: req.body.carid,
    country: req.body.country,
    jobtitle: req.body.jobtitle,
  };

  customerdetails.customerWithId(personId)
    .then((result) => {
      if (result.rows.length > 0) {
        const { error } = validateCustomer(updatedCustomerDetails);

        if (error) {
          return res.status(400).send(error.details[0].message);
        }

        customerdetails.updateCustomerWithId(personId, updatedCustomerDetails)
          .then(() => {
            res.json(updatedCustomerDetails);
          }).catch(next);
      } else {
        res.status(400).json({ msg: `No customer with id ${personId}` });
      }
    }).catch(next);
});

// Delete the Customer with given ID
router.delete('/:personid', checkAuth, (req, res, next) => {
  const personId = req.params.personid;
  customerdetails.customerWithId(personId)
    .then((result) => {
      if (result.rows.length > 0) {
        customerdetails.deleteCustomerWithId(personId)
          .then(() => res.send('Succesfully Deleted'))
          .catch(next);
      } else {
        res.status(400).json({ msg: `No customer with id ${personId}` });
      }
    }).catch(next);
});


module.exports = router;
