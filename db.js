const Sequelize = require('sequelize');
const sequelize = new Sequelize('LearnWithMe', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate()
.then(
  function(){
    console.log('Connected to the LearnWithMe database.')
  },
  function(err){
    console.log(err);
  }
);

User = sequelize.import('./models/user');
Meeting = sequelize.import('./models/meeting');
User.hasMany(Meeting);
Meeting.belongsTo(User);

module.exports = sequelize;