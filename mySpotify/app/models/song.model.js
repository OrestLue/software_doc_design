module.exports = (sequelize, Sequelize) => {
  return sequelize.define("songs", {
    name        : { type: Sequelize.STRING },
    duration    : { type: Sequelize.INTEGER },
    genre_id    : { type: Sequelize.INTEGER },
    disc_number : { type: Sequelize.INTEGER },
    track_number: { type: Sequelize.INTEGER },
    uri         : { type: Sequelize.STRING },
    popularity  : { type: Sequelize.INTEGER }
  });
};
