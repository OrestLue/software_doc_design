module.exports = (sequelize, Sequelize) => {
  return sequelize.define("artists", { name : {type: Sequelize.STRING} });
};
