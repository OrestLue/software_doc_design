const fs = require('fs');
const readline = require('readline');

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "usersdb",
    password: "jazz"
});



/*
const sql = `create table if not exists albums(
  id int primary key auto_increment,
  name varchar(255) not null,
  creator varchar(255) not null,
  cover varchar(255) not null,
  date int not null
)`;



connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log("Таблица создана");
});
connection.end();

*/


/*
const sql = `create table if not exists artists(
        id int primary key auto_increment,
        name varchar(255) not null
    )`;

connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log("Таблица создана");
});
connection.end();
*/

/* --------------------------------------
const readFile = readline.createInterface({
    input: fs.createReadStream('src/song_file.csv'),
    output: process.stdout,
    terminal: false
});

readFile
    .on('line', csv2sql)
    .on('close', function() {
        readFile.close();
        connection.end();
    });

function csv2sql(line) {
    let [album, artist, songName, songGenreID, songDuration] = line.split(';');
    songGenreID = parseInt(songGenreID, 10);
    songDuration = parseInt(songDuration, 10);

    //console.log(album + artist + songName + songGenreID + songDuration);
    if(artist !== 'artist') let artistResult = addArtist(artist);

}


function addArtist(name) {  // return: -1 - error, 0 - single performer, 1 - many performers
    let splitArtists;

    if(name.indexOf(' & ') === -1 && name.indexOf(' / ') === -1)
        return sendArtistToDB(name);
    else
        splitArtists = (name.indexOf(' & ') > -1) ? name.split(' & ') : name.split(' / ');

    for (const e of splitArtists)
        if(sendArtistToDB(e) === -1)
            return -1;


    return 1;
}


function sendArtistToDB(name) {
    let sql = `INSERT IGNORE INTO artists VALUES( ?, ? )`;

    connection.query(sql, [, name],function(err, results) {
        if(err) return -1;
        // console.log(name);
    });

    return 0;
}

function addAlbum() {

}
------------------------------------------------------------
 */
/*
const readFile = readline.createInterface({
    input: fs.createReadStream('src/song_file.csv'),
    output: process.stdout,
    terminal: false
});

readFile
    .on('line', csv2sql)
    .on('close', function() {
        readFile.close();
        connection.end();
    });

function csv2sql(line) {
    let [album, artist, songName, songGenreID, songDuration] = line.split(';');
    songGenreID = parseInt(songGenreID, 10);
    songDuration = parseInt(songDuration, 10);

    //console.log(album + artist + songName + songGenreID + songDuration);
    let songResult;
    if(songName !== 'song') songResult = sendSongToDB(songName, songGenreID, songDuration);

    return songResult;
}

function sendSongToDB(name, genre_id, duration) {
    let sql = `INSERT IGNORE INTO songs VALUES( ?, ?, ?, ? )`;

    connection.query(sql, [, name, genre_id, duration],function(err, results) {
        if(err) return -1;
        // console.log(name);
    });

    return 0;
}
*/


connection.connect(err => {
    if (err) {
        console.log(err);
        return err;
    }
});

function csv2sql(line) {
    let [album, artist, songName] = line.split(';');

    if(artist !== 'artist') {
        // console.log(artist);
        // console.log(getArtistIDs(artist));
        getSongID(songName);
    }
}

function getArtistIDs(artist) {

    let sql = (artist.indexOf(' & ') === -1 && artist.indexOf(' / ') === -1) ?
        "SELECT ?? FROM artists WHERE ? LIKE ??" :
        "SELECT ?? FROM artists WHERE ? LIKE CONCAT('%', ??, '%')";

    connection.query(sql, ["id", artist, "name"], (err, result, fields) => {
        if (err) {
            console.log(err);
            return err;
        }
        else return result;
    });
}

function getSongID(name) {

    let sql = "SELECT ?? FROM songs WHERE ? = ??";
    let ids;

    connection.query(sql, ["id", name,"name"], (err, result, fields) => {
        // console.log(result);
        if (err) {
            console.log(err);
        }
        else {
            result = result.map(element => element['id']);
            console.log(result);
        }
    });
}











const readFile = readline.createInterface({
    input: fs.createReadStream('src/song_file.csv'),
    output: process.stdout,
    terminal: false
});

readFile
    .on('line', csv2sql)
    .on('close', function() {
        readFile.close();
        connection.end();
    });
