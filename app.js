require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

let sequelize = require('./db');

// let teacher = require('./controllers/teachercontroller');
// let student = require('./controllers/studentcontroller');
// let user = require('./controllers/usercontroller')
// let meeting = require('./controllers/meetingcontroller')
const controllers = require('./controllers')

sequelize.sync();

const middlewares = require('./middleware');
app.use(middlewares.CORS);
app.use(express.json());


app.use('/teacher', controllers.Teacher);
app.use('/student', controllers.Student);
//app.use('/user', controllers.User);
app.use('/meeting', controllers.Meeting);

app.listen(port, function() {
  console.log('The server is up and running on port 3000');
})