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

/* ------------------ STUDENT ENDPOINTS ------------------------------*/


/******* STUDENT CREATE A TASK *********/
router.post('/student_create', validateStudentSession, function(req, res){
  const newTask = {
    description: req.body.description,
    completed: false,
    goalId: req.body.goalId,
    studentId: req.student.id,
  }
  Task.create(newTask)
  .then(task => res.status(200).json(task))
  .catch(err => res.status(500).json({error: err}));
});

/******* STUDENT UPDATE A TASK *********/
router.put('/student_update/:id', validateStudentSession, function(req, res){
  const updateTask = {
    description: req.body.description,
    completed: req.body.completed
  }

  const query = {
    where: {
      id: req.params.id,
      studentId: req.student.id,
      teacherId: null
    }
  }

  Task.update(updateTask, query)
  .then(update => {
    if(update[0] === 0){
      return res.status(200).send("No matching task");
    }else{
      return res.status(200).json({data: update});
    }
  })
  .catch(err => res.status(500).json({error: err}));
});

/******** RETRIEVE TASKS BY STUDENT ID *********/
router.get('/student_get', validateStudentSession, function(req, res){
  Task.findAll({
    where:{
      studentId: req.student.id
    }
  })
  .then(tasks => res.status(200).json(tasks))
  .catch(err => res.status(500).json({error: err}))
});

/******** RETRIEVE TASKS BY GOAL ID *********/
router.get('/student_get/:id', validateStudentSession, function(req, res){
  Task.findAll({
    where:{
      goalId: req.params.id
    }
  })
  .then(tasks => res.status(200).json(tasks))
  .catch(err => res.status(500).json({error: err}))
});

/******** STUDENT DELETE A TASK ********/
router.delete('/student_delete/:id', validateStudentSession, function(req, res){
  Task.destroy({
    where: {
      id: req.params.id,
      studentId: req.student.id,
      teacherId: null
    }
  })
    .then(update => {
      if(update === 0){
        return res.status(200).send('No matching task found.')
      }else{
        return res.status(200).json({message: `${update} tasks removed`})
      }
    })
    .catch(err => res.status(500).json({error: err}));
});

/* ------------------ TEACHER ENDPOINTS ------------------------------*/


/******* TEACHER CREATE A TASK *********/
router.post('/teacher_create', validateTeacherSession, function(req, res){
  const newTask = {
    description: req.body.description,
    completed: false,
    goalId: req.body.goalId,
    studentId: req.body.studentId,
    teacherId: req.teacher.id
  }
  Task.create(newTask)
  .then(task => res.status(200).json(task))
  .catch(err => res.status(500).json({error: err}));
});

/******* TEACHER BULK CREATE *********/
router.post('/teacher_bulk', validateTeacherSession, function(req, res){
  Task.bulkCreate(req.body.taskList, { returning: true })
  .then(taskList => res.status(200).json(taskList))
  .catch(err => res.status(500).json({error: err}));
});

/******* TEACHER UPDATE A TASK *********/
router.put('/teacher_update/:id', validateTeacherSession, function(req, res){
  const updateTask = {
    description: req.body.description,
    completed: req.body.completed
  }

  const query = {
    where: {
      id: req.params.id,
      teacherId: req.teacher.id
    }
  }

  Task.update(updateTask, query)
  .then(update => {
    if(update[0] === 0){
      return res.status(200).send("No matching task");
    }else{
      return res.status(200).json({data: update});
    }
  })
  .catch(err => res.status(500).json({error: err}));
});

/******** RETRIEVE TASKS BY TEACHER ID *********/
router.get('/teacher_get', validateTeacherSession, function(req, res){
  Task.findAll({
    where:{
      teacherId: req.teacher.id
    }
  })
  .then(tasks => res.status(200).json(tasks))
  .catch(err => res.status(500).json({error: err}))
});

/******** RETRIEVE TASKS BY GOAL ID *********/
router.get('/teacher_get/:id', validateTeacherSession, function(req, res){
  Task.findAll({
    where:{
      goalId: req.params.id
    }
  })
  .then(tasks => res.status(200).json(tasks))
  .catch(err => res.status(500).json({error: err}))
});

/******** STUDENT DELETE A TASK ********/
router.delete('/teacher_delete/:id', validateTeacherSession, function(req, res){
  Task.destroy({
    where: {
      id: req.params.id,
      teacherId: req.teacher.id,
    }
  })
    .then(update => {
      if(update === 0){
        return res.status(200).send('No matching task found.')
      }else{
        return res.status(200).json({message: `${update} tasks removed`})
      }
    })
    .catch(err => res.status(500).json({error: err}));
});

module.exports = router;