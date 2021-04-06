module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('student', {
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
    teacherList: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },
  })
  return Student;
}