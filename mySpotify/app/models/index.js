const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host   : dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max    : dbConfig.pool.max,
    min    : dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle   : dbConfig.pool.idle
  },
  define: {
    timestamps: false
  }
});
// fill db
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// to model
db.albums    = require("./album.model.js")(sequelize, Sequelize);
db.artists   = require("./artist.model.js")(sequelize, Sequelize);
db.genres    = require("./genre.model.js")(sequelize, Sequelize);
db.playlists = require("./playlist.model.js")(sequelize, Sequelize);
db.songs     = require("./song.model.js")(sequelize, Sequelize);

module.exports = db;
