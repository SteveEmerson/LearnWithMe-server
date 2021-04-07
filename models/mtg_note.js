module.exports = (sequelize, DataTypes) => {
  const MtgNote = sequelize.define('mtg_note', {
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
  })
  return MtgNote;
}