const pg = require("pg");
const settings = require("./settings"); // settings.json
const moment = require("moment");

// const { Client } = require('pg')

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  const name = process.argv[2];

  if (err) {
    return console.error("Connection Error", err);
  }
  
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    const countPeople = result.rowCount
    console.log(`Searching ... \nFound ${countPeople} person(s) by the name '${name}':`)

    const printUserData = (person, index) => 
        console.log(`- ${index + 1}: ${person.first_name} ${person.last_name}, born '${moment(person.birthdate).format("YYYY-MM-DD")}'`);

    result.rows.forEach(printUserData);
    client.end();
  });
});