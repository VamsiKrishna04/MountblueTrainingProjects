const client = require('../dbDetails');


function selectAllCars() {
  return client.query('SELECT * FROM cardetails;');
}

function carWithId(carId) {
  return client.query('SELECT * FROM cardetails WHERE carid = $1;', [carId]);
}

function createNewCar(carmake, carmodel, carmodelyear) {
  return client.query('INSERT INTO cardetails (carmake,carmodel,carmodelyear) VALUES ($1, $2, $3);', [carmake, carmodel, carmodelyear]);
}

function updateCarWithId(carId, updatedCarDetails) {
  return client.query('UPDATE cardetails SET carmake =$1, carmodel=$2, carmodelyear = $3 WHERE carid = $4;', [updatedCarDetails.carmake, updatedCarDetails.carmodel, updatedCarDetails.carmodelyear, carId]);
}

function deleteCarWithId(carId) {
  return client.query('DELETE FROM cardetails WHERE carid = $1;', [carId]);
}

module.exports = {
  selectAllCars,
  carWithId,
  createNewCar,
  updateCarWithId,
  deleteCarWithId,
};
