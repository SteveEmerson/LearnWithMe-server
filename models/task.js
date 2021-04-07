module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('task', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  })
  return Task;
}