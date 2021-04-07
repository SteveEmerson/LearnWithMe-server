const router = require('express').Router();
const sequelize = require('../db')
const Task = sequelize.import('../models/task');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateStudentSession = require('../middleware/validate-student-session');
const validateTeacherSession = require('../middleware/validate-teacher-session');

// Test endpoint
router.get('/test', function(req, res){
  res.send('Got to the task endpoint')
})

module.exports = router;