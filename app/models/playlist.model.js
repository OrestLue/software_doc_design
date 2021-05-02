module.exports = (sequelize, Sequelize) => {
  return sequelize.define('playlist', {
    name      : { type: Sequelize.STRING(45), allowNull: false },
    creator_id: { type: Sequelize.INTEGER,    allowNull: false },
  },
  {
    indexes: [
      {
        name  : 'name_idx',
        fields: ['name', 'creator_id'],
        unique: true
      }
    ]
 });
};
