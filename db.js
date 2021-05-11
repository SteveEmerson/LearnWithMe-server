const Sequelize = require('sequelize');

//Comment this in to run on Heroku  Lines 4-13
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions:{
    ssl:{
      require:true,
      rejectUnauthorized: false,
    }
  }
});

// Comment this out to run on Heroku  Lines 15-18
// const sequelize = new Sequelize('LearnWithMe', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres'
// });


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
Task = sequelize.import('./models/task');

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

Goal.hasMany(Task);
Task.belongsTo(Goal);

Student.hasMany(Task);
Task.belongsTo(Student);

Teacher.hasMany(Task);
Task.belongsTo(Teacher);

module.exports = sequelize;