const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "usersdb",
    password: "jazz"
});

const sql = `INSERT INTO artists(name) VALUES('The Beatles')`;

connection.query(sql, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});

connection.end();