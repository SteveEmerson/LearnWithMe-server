const User = require("./user");
const Meeting = require("./meeting");

// Setup Associations
User.hasMany(Meeting);
Meeting.belongsTo(User);

module.exports = {
  User,
  Meeting,
};