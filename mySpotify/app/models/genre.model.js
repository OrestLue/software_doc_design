module.exports = (sequelize, Sequelize) => {
  return sequelize.define("genres", { name: {type: Sequelize.STRING} });
};
