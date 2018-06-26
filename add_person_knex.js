const settings = require("./settings"); // settings.json
const moment = require("moment");

const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host     : settings.hostname,
        user     : settings.user,
        password : settings.password,
        database : settings.database
    }
  });

const firstName = process.argv[2];
const lastName = process.argv[3];
const date = process.argv[4];

knex.select('first_name', 'last_name', 'birthdate').from('famous_people')
.insert({first_name: firstName, last_name: lastName, birthdate: date}).into('famous_people')
.catch(function(error) {
    console.error(error)
});