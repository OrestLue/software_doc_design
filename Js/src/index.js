let fs = require("fs");

/*
let textRead = fs.readFileSync('text.txt', 'utf8').toString().split("\n");

for(let i in textRead) {
    if (textRead[i].includes('\t')) {
        // "Gimme Shelter"
        console.log(textRead[i-2],textRead[i-3],textRead[i-4]);
    }
}
*/

/*
let lineReader = require('readline').createInterface(
    {input: require('fs').createReadStream('text.txt')}
    );

let lineCounter = 0;
const songsArray = [];
const newSong = {
    album: '',
    artist: '',
    name: ''
};

function songParse(line) {
    if (line === '') return;

    if (line.includes('\t') && lineCounter !== 1) lineCounter = 0;

    lineCounter++;

    // console.log(lineCounter + ' : ' + line);

    switch (lineCounter) {
        case 2: newSong.artist = line;
                break;
        case 3: newSong.album = line;
                break;
        case 4: if (line.toLowerCase().includes('http'))
                    newSong.name = String(newSong.album.replace(/\s\(\d\d\d\d\)\s\[.*\]/g, ''));
                else newSong.name = line.substring(1, line.length-1);
                songsArray.push(Object.create(newSong));
                console.log(songsArray[0].name);
                //songsArray.push(newSong);
                break;
    }

}

lineReader.on('line', songParse);


console.log('----------------------------------------------------------------------------------------')

console.log(songsArray[0] + '!!!!');

for (const e of songsArray) {
    console.log(e.album + ', ' + e.artist + ', ' + e.name);
}

*/




let textRead = fs.readFileSync('text.txt', 'utf8').toString().split(/\r?\n/);

let lineCounter = 0;
const songsArray = [];
const newSong = {
    album: '',
    artist: '',
    name: ''
};


function songParse(line) {
    // if (line === '') return;

    if (line.includes('\t')) lineCounter = 0;

    lineCounter++;


    switch (lineCounter) {
        case 2: newSong.artist = line;
                break;

        case 3: newSong.album = line.replace(/\s\[.*\]/g, '');
                break;

        case 4: if (line.toLowerCase().includes('—'))
                    newSong.name = String(newSong.album.replace(/\s\(\d\d\d\d\)/g, ''));
                else
                    newSong.name = line;

                songsArray.push({...newSong});
                break;
    }
}

for(let line of textRead) {
    // console.log(line); // +', ' + lineCounter);
    songParse(line);
}

console.log('album' + ';' +'artist' + ';' + 'songName' + ';' + 'songGenreID' + ';' + 'songDuration');
let writeStream = fs.createWriteStream('song_file.csv');
writeStream.write('album' + ';' +'artist' + ';' + 'name' + ';' + 'genre' + ';' + 'duration' + '\n', 'utf-8');
let n = 1000;
for (const e of songsArray) {
    console.log(n + '. ' + e.album + ';' + e.artist + ';' + e.name);
    writeStream.write(e.album + ';' + e.artist + ';' + e.name + ';' + Math.floor(Math.random() * 191) + ';' + (Math.floor(Math.random() * 840) + 120) + (n > 1 ? '\n': ''), 'utf-8');
    // fs.writeFileSync('song_file.csv', e.album + ';' + e.artist + ';' + e.name);
    // fs.writeFile('song_file.csv', e.album + ';' + e.artist + ';' + e.name, function (err, data) {});
    n--;
}


writeStream.on('finish', () => {
    writeStream.end();
    console.log('bang!');
});

// close the stream
// writeStream.end();

