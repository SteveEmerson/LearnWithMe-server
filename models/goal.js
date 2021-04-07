module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('goal', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    targetDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  })
  return Goal;
}