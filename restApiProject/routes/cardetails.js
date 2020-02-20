const Joi = require('@hapi/joi');

const express = require('express');


const router = express.Router();

const cardetails = require('../db/cardetails');

// Middleware Function
const checkAuth = require('../middleware/check-auth');

// To get all cars details
router.get('', (req, res, next) => {
  cardetails.selectAllCars()
    .then((result) => {
      res.json(result.rows);
    }).catch(next);
});

// To get car details of specific car
router.get('/:carid', (req, res, next) => {
  const carId = req.params.carid;
  cardetails.carWithId(carId)
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(400).json({ msg: `No car with id ${carId}` });
      }
    }).catch(next);
});

// Validate Car details using Joi
function validateCarDetails(car) {
  const schema = Joi.object({
    carmake: Joi.string().min(3).required(),
    carmodel: Joi.string().min(2).required(),
    carmodelyear: Joi.number().integer().min(1900).max(2019),
  });

  return schema.validate(car);
}

// Create New Car
router.post('/', checkAuth, (req, res, next) => {
  // To send request body
  // res.send(req.body);
  
  // Get New Car Details from requsest.body
  const newCar = {
    carmake: req.body.carmake,
    carmodel: req.body.carmodel,
    carmodelyear: req.body.carmodelyear,
  };
  
  const { error } = validateCarDetails(newCar);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  cardetails.createNewCar(newCar.carmake, newCar.carmodel, newCar.carmodelyear)
    .then(() => {
      res.json(newCar);
    }).catch(next);
});


// Update car details
router.put('/:carid', checkAuth, (req, res, next) => {
  const carId = req.params.carid;
  cardetails.carWithId(carId)
    .then((result) => {
      if (result.rows.length > 0) {
        const updatedCarDetails = req.body;
        const { error } = validateCarDetails(updatedCarDetails);
        if (error) {
          return res.status(400).send(error.details[0].message);
        }
        cardetails.updateCarWithId(carId, updatedCarDetails)
          .then(() => {
            res.json(updatedCarDetails);
          }).catch(next);
      } else {
        res.status(400).json({ msg: `No car with id ${carId}` });
      }
    }).catch(next);
});

// Delete row in table
router.delete('/:carid', checkAuth, (req, res, next) => {
  const carId = req.params.carid;
  cardetails.carWithId(carId)
    .then((result) => {
      if (result.rows.length > 0) {
        cardetails.deleteCarWithId(carId)
          .then(() => {
            res.send('Specified Car had been deleted');
          }).catch(next);
      } else {
        res.status(400).json({ msg: `No car with id ${carId}` });
      }
    }).catch(next);
});

module.exports = router;
