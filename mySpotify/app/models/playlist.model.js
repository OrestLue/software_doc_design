module.exports = (sequelize, Sequelize) => {
  return sequelize.define("playlists", {
    name      : { type: Sequelize.STRING(45) },
    creator_id: { type: Sequelize.INTEGER },
  });
};
