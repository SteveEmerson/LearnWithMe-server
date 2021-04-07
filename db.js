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

Student = sequelize.import('./models/student');
Teacher = sequelize.import('./models/teacher');
//User = sequelize.import('./models/user');
Meeting = sequelize.import('./models/meeting');
MtgNote = sequelize.import('./models/mtg_note');
Goal = sequelize.import('./models/goal');

Teacher.hasMany(Meeting);
Meeting.belongsTo(Teacher);

Student.hasMany(Meeting);
Meeting.belongsTo(Student);

Meeting.hasMany(MtgNote);
MtgNote.belongsTo(Meeting);

Student.hasMany(MtgNote);
MtgNote.belongsTo(Student);

Teacher.hasMany(MtgNote);
MtgNote.belongsTo(Teacher);

Student.hasMany(Goal);
Goal.belongsTo(Student);

Teacher.hasMany(Goal);
Goal.belongsTo(Teacher);

module.exports = sequelize;