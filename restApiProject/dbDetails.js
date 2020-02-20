// Create a client object to connect to the database
const { Client } = require('pg');

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'temp',
  password: 'password',
  port: 5433,
};

// To create a new Client Instance
const client = new Client(dbConfig);

client.connect();

module.exports = client;
