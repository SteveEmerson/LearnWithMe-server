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

/* ------------------ STUDENT ENDPOINTS ------------------------------*/

/******* STUDENT CREATE A GOAL *********/
router.post('/student_create', validateStudentSession, function(req, res){
  const newGoal = {
    description: req.body.description,
    dateCreated: new Date(Date.now()),
    targetDate: req.body.targetDate, 
    studentId: req.student.id,
    teacherId: null
  }
  Goal.create(newGoal)
  .then(goal => res.status(200).json(goal))
  .catch(err => res.status(500).json({error: err}));
});

/******* STUDENT UPDATE A GOAL *********/
router.put('/student_update/:id', validateStudentSession, function(req, res){
  const updateGoal = {
    description: req.body.description,
    targetDate: req.body.targetDate
  }

  const query = {
    where: {
      id: req.params.id,
      studentId: req.student.id
    }
  }

  Goal.update(updateGoal, query)
  .then(update => {
    if(update[0] === 0){
      return res.status(200).send("No matching goal");
    }else{
      return res.status(200).json({data: update});
    }
  })
  .catch(err => res.status(500).json({error: err}));
});

/******** RETRIEVE GOALS BY STUDENT ID *********/
router.get('/student_get', validateStudentSession, function(req, res){
  Goal.findAll({
    where:{
      studentId: req.student.id
    }
  })
  .then(goals => res.status(200).json(goals))
  .catch(err => res.status(500).json({error: err}))
});

/******** STUDENT DELETE A GOAL (PERSONAL ONLY) ********/
router.delete('/student_delete/:id', validateStudentSession, function(req, res){
  Goal.destroy({
    where: {
      id: req.params.id,
      studentId: req.student.id,
      teacherId: null
    }
  })
    .then(update => {
      if(update === 0){
        return res.status(200).send('No matching goal found.')
      }else{
        return res.status(200).json({message: `${update} goals removed`})
      }
    })
    .catch(err => res.status(500).json({error: err}));
});


/* ------------------ TEACHER ENDPOINTS ------------------------------*/

/******* TEACHER CREATE A GOAL *********/
router.post('/teacher_create', validateTeacherSession, function(req, res){
  const newGoal = {
    description: req.body.description,
    dateCreated: new Date(Date.now()),
    targetDate: req.body.targetDate, 
    studentId: req.body.studentId,
    teacherId: req.teacher.id
  }
  Goal.create(newGoal)
  .then(goal => res.status(200).json(goal))
  .catch(err => res.status(500).json({error: err}));
});

/******* TEACHER UPDATE A GOAL *********/
router.put('/teacher_update/:id', validateTeacherSession, function(req, res){
  const updateGoal = {
    description: req.body.description,
    targetDate: req.body.targetDate
  }

  const query = {
    where: {
      id: req.params.id,
      teacherId: req.teacher.id
    }
  }

  Goal.update(updateGoal, query)
  .then(update => {
    if(update[0] === 0){
      return res.status(200).send("No matching goal");
    }else{
      return res.status(200).json({data: update});
    }
  })
  .catch(err => res.status(500).json({error: err}));
});

/******** RETRIEVE GOAL BY TEACHER ID AND STUDENT ID *********/
router.get('/teacher_get/:id', validateTeacherSession, function(req, res){
  Goal.findOne({
    where:{
      teacherId: req.teacher.id,
      studentId: req.params.id
    }
  })
  .then(goal => {
    if(goal){
      return res.status(200).json(goal);
    }else{
      return res.status(200).send("No mathcing goal")
    }
    
  })
  .catch(err => res.status(500).json({error: err}))
});

/******** TEACHER DELETE A GOAL  ********/
router.delete('/teacher_delete/:id', validateTeacherSession, function(req, res){
  Goal.destroy({
    where: {
      id: req.params.id,
      teacherId: req.teacher.id
    }
  })
    .then(update => {
      if(update === 0){
        return res.status(200).send('No matching goal found.')
      }else{
        return res.status(200).json({message: `${update} goals removed`})
      }
    })
    .catch(err => res.status(500).json({error: err}));
});




module.exports = router;