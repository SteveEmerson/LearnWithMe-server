const router = require('express').Router();
const sequelize = require('../db')
const MtgNote = sequelize.import('../models/mtg_note');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateStudentSession = require('../middleware/validate-student-session');
const validateTeacherSession = require('../middleware/validate-teacher-session');


// Test endpoint
router.get('/test', function(req, res){
  res.send('Got to the meeting note endpoint')
})

/* ------------------ STUDENT ENDPOINTS ------------------------------*/


/******* STUDENT CREATE A NOTE *********/
router.post('/student_create', validateStudentSession, function(req, res){
  //console.log(req.body);
  const newNote = {
    content: req.body.content,
    meetingId: req.body.meetingId,
    studentId: req.student.id
  }
  MtgNote.create(newNote)
  .then(note => res.status(200).json(note))
  .catch(err => res.status(500).json({error: err}));
});

/******* STUDENT UPDATE A NOTE *********/
router.put('/student_update/:id', validateStudentSession, function(req, res){
  const updateNote = {
    content: req.body.content
  }

  const query = {
    where: {
      id: req.params.id,
      studentId: req.student.id
    }
  }

  MtgNote.update(updateNote, query)
  .then(update => {
    if(update[0] === 0){
      return res.status(200).send("No matching note");
    }else{
      return res.status(200).json({data: update});
    }
  })
  .catch(err => res.status(500).json({error: err}));
});

/******** RETRIEVE NOTES BY STUDENT ID *********/
router.get('/student_get', validateStudentSession, function(req, res){
  MtgNote.findAll({
    where:{
      studentId: req.student.id
    }
  })
  .then(notes => res.status(200).json(notes))
  .catch(err => res.status(500).json({error: err}))
});

/******** RETRIEVE NOTES BY MEETING ID *********/
router.get('/student_get/:id', validateStudentSession, function(req, res){
  MtgNote.findAll({
    where:{
      meetingId: req.params.id
    }
  })
  .then(notes => res.status(200).json(notes))
  .catch(err => res.status(500).json({error: err}))
});

/******** STUDENT DELETE A NOTE ********/
router.delete('/student_delete/:id', validateStudentSession, function(req, res){
  MtgNote.destroy({
    where: {
      id: req.params.id,
      studentId: req.student.id
    }
  })
    .then(update => {
      if(update === 0){
        return res.status(200).send('No matching note found.')
      }else{
        return res.status(200).json({message: `${update} notes removed`})
      }
    })
    .catch(err => res.status(500).json({error: err}));
});



/* ------------------ TEACHER ENDPOINTS ------------------------------*/

router.post('/teacher_create', validateTeacherSession, function(req, res){
  //console.log(req.body);
  const newNote = {
    content: req.body.content,
    meetingId: req.body.meetingId,
    teacherId: req.teacher.id
  }
  MtgNote.create(newNote)
  .then(note => res.status(200).json(note))
  .catch(err => res.status(500).json({error: err}));
});

/******* TEACHER UPDATE A NOTE *********/
router.put('/teacher_update/:id', validateTeacherSession, function(req, res){
  const updateNote = {
    content: req.body.content
  }

  const query = {
    where: {
      id: req.params.id,
      teacherId: req.teacher.id
    }
  }

  MtgNote.update(updateNote, query)
  .then(update => {
    if(update[0] === 0){
      return res.status(200).send("No matching note");
    }else{
      return res.status(200).json({data: update});
    }
  })
  .catch(err => res.status(500).json({error: err}));
});

/******** RETRIEVE NOTES BY TEACHER ID *********/
router.get('/teacher_get', validateTeacherSession, function(req, res){
  MtgNote.findAll({
    where:{
      teacherId: req.teacher.id
    }
  })
  .then(notes => res.status(200).json(notes))
  .catch(err => res.status(500).json({error: err}))
});

/******** RETRIEVE NOTES BY MEETING ID *********/
router.get('/teacher_get/:id', validateTeacherSession, function(req, res){
  MtgNote.findAll({
    where:{
      meetingId: req.params.id
    }
  })
  .then(notes => res.status(200).json(notes))
  .catch(err => res.status(500).json({error: err}))
});

/******** TEACHER DELETE A NOTE ********/
router.delete('/teacher_delete/:id', validateTeacherSession, function(req, res){
  MtgNote.destroy({
    where: {
      id: req.params.id,
      teacherId: req.teacher.id
    }
  })
    .then(update => {
      if(update === 0){
        return res.status(200).send('No matching note found.')
      }else{
        return res.status(200).json({message: `${update} notes removed`})
      }
    })
    .catch(err => res.status(500).json({error: err}));
});

module.exports = router;
