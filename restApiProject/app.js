const log = require('./src/utils/logger');

const client = require('./dbDetails');

// .then(() => client.query('DROP TABLE IF EXISTS cardetails,customerdetails,userdetails CASCADE'))
// Below Line returns a promise
client.query('DROP TABLE IF EXISTS cardetails,customerdetails,userdetails CASCADE')
  .then(() => client.query('CREATE TABLE cardetails(carId serial PRIMARY KEY,carMake  varchar(50) NOT NULL,carModel varchar(50) NOT NULL,carModelYear smallint NOT NULL);'))
  .then(() => client.query("CREATE TABLE customerdetails(personid serial PRIMARY KEY,email varchar(50) NOT NULL,gender varchar(20) NOT NULL,name varchar(50) NOT NULL,phonenum varchar(20) NOT NULL,carId serial REFERENCES cardetails(carid) ON DELETE CASCADE,country varchar(20) check(country in ('China','United States','Nepal','Thailand','South Africa','New Zealand','United Kingdom','Bangladesh','Australia','India')),jobtitle varchar(50) NOT NULL,UNIQUE(email,phonenum));"))
  .then(() => client.query('CREATE TABLE userdetails(userid serial PRIMARY KEY,email varchar(50) NOT NULL UNIQUE,password varchar(500) NOT NULL);'))
// .then(() => client.query('SELECT * FROM cardetails;'))
// .then((results) => console.table(results.rows))
// .then(() => client.query('SELECT * FROM customerdetails;'))
// .then((results) => console.table(results.rows))
  // .then(() => client.query("COPY cardetails FROM '/home/vamsi04/MountBlueTraining/test/carDetails.csv' DELIMITER ',' CSV;"))
  // .then(() => client.query("COPY customerdetails FROM '/home/vamsi04/MountBlueTraining/test/customerDetails.csv' DELIMITER ',' CSV;"))
  .then(() => client.query("COPY cardetails FROM '/home/vamsi04/MountBlueTraining/Javascript/restApiProject/sampledata/carDetails.csv' DELIMITER ',' CSV;"))
  .then(() => client.query("COPY customerdetails FROM '/home/vamsi04/MountBlueTraining/Javascript/restApiProject/sampledata/customerDetails.csv' DELIMITER ',' CSV;"))
  .then(() => client.query("SELECT setval('cardetails_carid_seq'::regclass, (SELECT MAX(carid) FROM cardetails))"))
  .then(() => client.query("SELECT setval('customerdetails_personid_seq'::regclass, (SELECT MAX(personid) FROM customerdetails))"))
  .then(() => client.query("SELECT setval('userdetails_userid_seq'::regclass, (SELECT MAX(userid) FROM userdetails))"))
// .then(() => client.query('SELECT * FROM cardetails;'))
// .then((results) => console.table(results.rows))
// .then(() => client.query('SELECT * FROM customerdetails;'))
// .then((results) => console.table(results.rows))
  .catch((e) => log.error(e))
  .finally(() => client.end());
