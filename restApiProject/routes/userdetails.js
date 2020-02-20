const bcrypt = require('bcrypt');

const Joi = require('@hapi/joi');

const jwt = require('jsonwebtoken');

const express = require('express');

const router = express.Router();

const userdetails = require('../db/userdetails');

require('dotenv').config();


// Validate user details using Joi
function validateUserDetails(user) {
  const schema = Joi.object({
    // Change Email Validation later
    email: Joi.string().min(3).required(),
    password: Joi.string().min(2).required(),
  });
  return schema.validate(user);
}


// Create New User
router.post('/signup', (req, res, next) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = validateUserDetails(newUser);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  userdetails.UserWithEmail(newUser.email)
    .then((result) => {
      if (result.rows.length === 0) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          }
          userdetails.createNewUser(newUser.email, hash)
            .then(() => {
              // Created Resource
              res.status(201).json({
                message: 'User Created',
              });
            }).catch(next);
        });
      } else {
        return res.status(400).send('Email Already Exists');
      }
    }).catch(next);
});


// User Login
router.post('/login', (req, res, next) => {
  const userDetails = {
    email: req.body.email,
    password: req.body.password,
  };
  const { error } = validateUserDetails(userDetails);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  userdetails.UserWithEmail(userDetails.email)
    .then((result) => {
      if (result.rows.length > 0) {
        // From DB
        const userPassword = result.rows[0].password;
        bcrypt.compare(userDetails.password, userPassword, (err, success) => {
          if (err) {
            return res.status(401).json({
              message: 'Auth Failed',
            });
          }
          if (success) {
            const token = jwt.sign({
              email: result.rows[0].email,
              userId: result.rows[0].userid,
            },
            // 'secret'
            process.env.JWT_KEY,
            {
              expiresIn: '1h',
            });
            return res.status(200).json({
              message: 'Auth Succesful',
              token: token,
            });
          }
          return res.status(401).json({
            message: 'Auth Failed',
          });
        });
      } else {
      // Unauthorized
      // To display if user doesnt exist
        return res.status(401).json({
          message: 'Auth Failed',
        });
      }
    }).catch(next);
});

module.exports = router;
