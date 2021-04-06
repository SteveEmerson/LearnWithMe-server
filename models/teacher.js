module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teacher', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    studentList: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },
  })
  return Teacher;
}