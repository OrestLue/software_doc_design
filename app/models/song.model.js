module.exports = (sequelize, Sequelize) => {
  return sequelize.define('song', {
    name        : { type: Sequelize.STRING,  allowNull: false },
    duration    : { type: Sequelize.INTEGER, allowNull: false },
    disc_number : { type: Sequelize.INTEGER },
    track_number: { type: Sequelize.INTEGER },
    uri         : { type: Sequelize.STRING },
    popularity  : { type: Sequelize.INTEGER }
  },
  {
    indexes: [
      {
        name  : 'name_idx',
        fields: ['name', 'duration'],
        unique: true
      }
    ]
  });
};
