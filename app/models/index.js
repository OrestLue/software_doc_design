const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.album    = require("./album.model.js")(sequelize, Sequelize);
db.artist   = require("./artist.model.js")(sequelize, Sequelize);
db.genre    = require("./genre.model.js")(sequelize, Sequelize);
db.playlist = require("./playlist.model.js")(sequelize, Sequelize);
db.song     = require("./song.model.js")(sequelize, Sequelize);

// Artist-Album, Many-to-Many
db.artist.belongsToMany(db.album, {through: "artist_album"});
db.album.belongsToMany(db.artist, {through: "artist_album"});

// Playlist-Song, Many-to-Many
db.playlist.belongsToMany(db.song, {through: "playlist_song"});
db.song.belongsToMany(db.playlist, {through: "playlist_song"});

// Song-Album, Many-to-Many
db.song.belongsToMany(db.album, {through: "song_album"});
db.album.belongsToMany(db.song, {through: "song_album"});

// Song-Artist, Many-to-Many
db.song.belongsToMany(db.artist, {through: "song_artist"});
db.artist.belongsToMany(db.song, {through: "song_artist"});

// Genre-Song, One-to-Many
db.genre.hasMany(db.song);        // foreignKey: 'genreId'
db.song.belongsTo(db.genre);


module.exports = db;
