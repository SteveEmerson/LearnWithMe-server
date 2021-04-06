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

module.exports = sequelize;