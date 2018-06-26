const settings = require("./settings"); // settings.json
const moment = require("moment");

const knex = require('knex')({
    client: 'pg',
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

knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: date})
    // asCallback way:
    .asCallback((err, rows) => {
        if (err) return console.error(err);
        return knex.destroy();
    });

    // promise way:
    // .catch(function(error) {
    //     console.error(error)
    // });