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


const name = process.argv[2];

knex.select().from('famous_people')
    .where('first_name','=', name)
    .orWhere('last_name', '=', name)
    .asCallback((err, rows) => {
        //   console.log(rows);
        //   console.log(rows.length);
        const countPeople = rows.length
        const printUserData = (person, index) => 
            console.log(`- ${index + 1}: ${person.first_name} ${person.last_name}, born '${moment(person.birthdate).format("YYYY-MM-DD")}'`);

        if (err) return console.error(err);

        console.log(`Searching ... \nFound ${countPeople} person(s) by the name '${name}':`);
        rows.forEach(printUserData);
        return knex.destroy();
    });