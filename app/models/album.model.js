module.exports = (sequelize, Sequelize) => {
  return sequelize.define('album', {
    name        : { type: Sequelize.STRING, allowNull: false },
    release_date: { type: Sequelize.DATEONLY },
    uri         : { type: Sequelize.STRING },
  },
  {
    indexes: [
      {
        name  : 'name_idx',
        fields: ['name', 'release_date'],
        unique: true
      }
    ]
  }
  );
};
