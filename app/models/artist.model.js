module.exports = (sequelize, Sequelize) => {
  return sequelize.define('artist', {
    name: {
      type     : Sequelize.STRING,
      allowNull: false
    }
  },
  {
    indexes: [
      {
        name  : 'name_idx',
        fields: ['name'],
        unique: true
      }
    ]
  });
};
