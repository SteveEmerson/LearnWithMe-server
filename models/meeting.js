module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('meeting', {
    d_t: {
      type: DataTypes.DATE,
      allowNull: false
    },
  })
  return Meeting;
}