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

Student = sequelize.import('./models/student')
Teacher = sequelize.import('./models/teacher')
//User = sequelize.import('./models/user');
Meeting = sequelize.import('./models/meeting');

Teacher.hasMany(Meeting);
Meeting.belongsTo(Teacher);
Student.hasMany(Meeting);
Meeting.belongsTo(Student);

module.exports = sequelize;