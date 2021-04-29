const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'root',
    database: 'myspotifydb',
    password: 'jazz'
};


async function dependenciesSetter(data) {
    const conn = await mysql.createConnection(config);

    // track           | t_artists        | album           | a_artists | release    | d_number | t_number | duration
    // The Boy Is Mine | Brandy;Monica    | Never Say Never | Brandy    | 29.05.1998 | 1        | 3        | 294786
    // The Boy Is Mine | [Brandy, Monica] | Never Say Never | [Brandy]  | 1998-05-29 | 1        | 3        | 294786

    // Track Identification
    // const track = 'The Boy Is Mine';
    // const t_artists = ['Brandy', 'Monica'];
    // const d_number = 1;
    // const t_number = 3;
    // const duration = 294786;

    // Album Identification
    // const album = 'Never Say Never';
    // const a_artists = ['Brandy'];
    // const release = '1998-05-29'


    for (const e of data) {

        // headerKeys: ['track', 't_artists', 'album',  'a_artists', 'release', 'd_number', 't_number', 'duration']
        let track = e['track'];
        let t_artists = e['t_artists'];
        let album = e['album'];
        let a_artists = e['a_artists'];
        let release = e['release'];
        let d_number = e['d_number'];
        let t_number = e['t_number'];
        let duration = e['duration'];

        console.log('--------------------------------------------------------------------------------------------\n' +
            track + ' | ' + t_artists + '\n' +
            album + ' | ' + a_artists + '\n' +
            release + ' | ' + d_number + ' | ' + t_number + ' | ' + duration + '\n');


        // Get all IDs of the artists of the track
        let t_artists_id = [];
        try {
            for (const artist of t_artists) {
                const [rows] = await conn.execute('SELECT id FROM `artists` WHERE `name` = ?', [artist]);
                t_artists_id.push(rows[0]['id']);
            }
            console.log('Song  [ ' + t_artists + ' ] ID: [ ' + t_artists_id + ' ]');
        }
        catch (error) {
            console.log(error);
        }


        // Get all IDs of the artists of the album
        let a_artists_id = [];
        try{
            for (const artist of a_artists) {
                const [rows] = await conn.execute('SELECT id FROM `artists` WHERE `name` = ?', [artist]);
                a_artists_id.push(rows[0]['id']);
            }
            console.log('Album [ ' + a_artists + ' ] ID: [ ' + a_artists_id +' ]');
        }
        catch (error) {
            console.log(error);
        }


        // Get the song ID
        let song_id = 0;
        try {
            const [sRows] = await conn.execute('SELECT id FROM `songs` WHERE `name` = ? AND `duration` = ? AND `track_number` = ?',
                                               [track, duration, t_number]);
            song_id = sRows[0]['id'];
            console.log('song_id: ' + song_id);
        }
        catch (error) {
            console.log(error);
        }


        // Get the album ID
        let album_id = 0;
        try {
            const [dRows] = await conn.execute('SELECT id FROM `albums` WHERE `name` = ?', // AND `release_date` = ?',
                [album /*, release*/]);
            album_id = dRows[0]['id'];
            console.log('album_id: ' + album_id);
        }
        catch (error) {
            console.log(error);
        }



        // Settings song_album dependencies
        if (song_id && album_id)
            await conn.execute('INSERT IGNORE INTO `song_album` (`song_id`, `album_id`) VALUES (?, ?)',
                               [song_id, album_id]);

        // Settings song_artist dependencies
        if (song_id)
            for (const artist_id of t_artists_id)
                await conn.execute('INSERT IGNORE INTO `song_artist` (`song_id`, `artist_id`) VALUES (?, ?)',
                                   [song_id, artist_id]);

        // Settings artist_album dependencies
        if (album_id)
            for (const artist_id of a_artists_id)
                await conn.execute('INSERT IGNORE INTO `artist_album` (`artist_id`, `album_id`) VALUES (?, ?)',
                                   [artist_id, album_id]);
    }

    conn.end();
}


let fs = require('fs');
let csv = fs.readFileSync('allSongs.csv');
// Парсінг із csv
let csvsync = require('csvsync');
let data = csvsync.parse(csv, {
    skipHeader: true,
    returnObject: true,
    headerKeys: ['track', 't_artists', 'album',  'a_artists', 'release', 'd_number', 't_number', 'duration'],
    delimiter: ';',
    trim: true
});


data.forEach(obj => {
    obj['t_artists'] = obj['t_artists'].split(';'); // розділяєм артистів, якщо їх кілька на одній пісні
    obj['a_artists'] = obj['a_artists'].split(';');

    let release = obj['release'].split('.');
    obj['release'] = release[2] + '-' + release[1] + '-' + release[0];
// ???
    obj['d_number'] = parseInt(obj['d_number']);
    obj['t_number'] = parseInt(obj['t_number']);
    obj['duration'] = parseInt(obj['duration']);
});


dependenciesSetter(data);