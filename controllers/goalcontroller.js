const router = require('express').Router();
const Goal = require('../db').import('../models/goal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateStudentSession = require('../middleware/validate-student-session');
const validateTeacherSession = require('../middleware/validate-teacher-session'); 

// Test endpoint
router.get('/test', function(req, res){
  res.send('Got to the goal endpoint')
})

module.exports = router;