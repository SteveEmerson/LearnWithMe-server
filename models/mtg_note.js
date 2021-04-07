module.exports = (sequelize, DataTypes) => {
  const Mtg_Note = sequelize.define('mtg_note', {
    conent: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
  })
  return Mtg_Note;
}