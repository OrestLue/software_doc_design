let mysql = require('mysql2');

/*
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jazz',
    database: 'usersdb'
});
*/

/*
const sql = `create table if not exists 
users(
    id int primary key auto_increment,
    name varchar (255) not null,
    age int not null
)`;
*/

/*
const sql = `create table if not exists student(
    id int primary key auto_increment,
    name varchar(255) not null,
    age int not null
)`;

connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log("Таблица создана");
});

connection.end();

connection.end(function(err) {
    if (err) {
        return console.log('error:' + err.message);
    }
    console.log('Close database connection.');
});
 */


/*
connection.query("CREATE DATABASE usersdb2",
    function(err, results) {
        if(err) console.log(err);
        else console.log("База данных создана");
    });

connection.end();
*/

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "usersdb2",
    password: "jazz"
});

/*
const sql = `create table if not exists users(
  id int primary key auto_increment,
  name varchar(255) not null,
  age int not null
)`;

connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log("Таблица создана");
});

connection.end();

*/

const users = [
    ["Bob", 22],
    ["Alice", 25],
    ["Kate", 28]
];
const sql = `INSERT INTO users(name, age) VALUES ?`;

connection.query(sql, [users], function(err, results) {
    if(err) console.log(err);
    console.log(results);
});

connection.end();