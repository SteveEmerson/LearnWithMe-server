module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
    partnerList: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    availability: {
      type: DataTypes.JSONB,
      allowNull: true
    },
  })
  return User;
}