module.exports = (sequelize, Sequelize) => {
  return sequelize.define("albums", {
    name        : { type: Sequelize.STRING },
    release_date: { type: Sequelize.DATEONLY },
    uri         : { type: Sequelize.STRING },
  });
};
