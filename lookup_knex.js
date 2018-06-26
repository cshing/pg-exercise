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


const name = process.argv[2];

knex.select().from('famous_people')
.where('first_name','=', name)
.orWhere('last_name', '=', name)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
    //   console.log(rows);
    //   console.log(rows.length);
      const countPeople = rows.length
      console.log(`Searching ... \nFound ${countPeople} person(s) by the name '${name}':`)

      const printUserData = (person, index) => 
        console.log(`- ${index + 1}: ${person.first_name} ${person.last_name}, born '${moment(person.birthdate).format("YYYY-MM-DD")}'`);

      rows.forEach(printUserData);
    });