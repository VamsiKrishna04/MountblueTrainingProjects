const client = require('../dbDetails');

// Get all Customers
function selectAllCustomers() {
  return client.query('SELECT * FROM customerdetails;');
}

// Get the Customer with given ID
function customerWithId(personId) {
  return client.query('select * from customerdetails where personid = $1;', [personId]);
}

// Add a new Customer
function createNewCustomer(newCustomer) {
  return client.query('INSERT INTO customerdetails (email,gender,name,phonenum,carid,country,jobtitle) VALUES($1, $2, $3, $4, $5, $6, $7);', [newCustomer.email, newCustomer.gender, newCustomer.name, newCustomer.phonenum, newCustomer.carid,
    newCustomer.country, newCustomer.jobtitle]);
}

// Update the Customer with given ID
function updateCustomerWithId(personId, updatedCustomerDetails) {
  return client.query('UPDATE customerdetails SET email = $2,gender = $3,name = $4,phonenum = $5,carid = $6,country = $7,jobtitle = $8 where personid = $1;', [personId, updatedCustomerDetails.email, updatedCustomerDetails.gender, updatedCustomerDetails.name, updatedCustomerDetails.phonenum, updatedCustomerDetails.carid, updatedCustomerDetails.country, updatedCustomerDetails.jobtitle]);
}

// Delete the Customer with given ID
function deleteCustomerWithId(personId) {
  return client.query('DELETE FROM customerdetails where personid = $1;', [personId]);
}

module.exports = {
  selectAllCustomers,
  customerWithId,
  createNewCustomer,
  updateCustomerWithId,
  deleteCustomerWithId,
};
