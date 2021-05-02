module.exports = {
  username: 'root',
  password: 'jazz',
  database: 'myspotifydb',
  dialect : 'mysql',
  port    : 3306,
  host    : 'localhost',
  pool: {
    min    : 0,
    max    : 5,
    idle   : 10000,
    acquire: 30000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  }
};
