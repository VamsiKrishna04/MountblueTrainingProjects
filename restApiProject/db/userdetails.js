const client = require('../dbDetails');

// Get the User with given email
function UserWithEmail(email) {
  return client.query('SELECT * FROM userdetails where email = $1;', [email]);
}

function createNewUser(userEmail, userPassword) {
  return client.query('INSERT INTO userdetails (email,password) VALUES ($1, $2);', [userEmail, userPassword]);
}

module.exports = {
  createNewUser,
  UserWithEmail,
};
