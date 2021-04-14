const router = require('express').Router();
const Meeting = require('../db').import('../models/meeting');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateStudentSession = require('../middleware/validate-student-session');
const validateTeacherSession = require('../middleware/validate-teacher-session'); 

// Test endpoint
router.get('/test', function(req, res){
  res.send('Got to the meeting endpoint')
})

/* ------------------ STUDENT ENDPOINTS ------------------------------*/


/******* STUDENT CREATE A MEETING *********/
router.post('/student_create', validateStudentSession, function(req, res){
  //console.log(req.body);
  const newMeeting = {
    d_t: req.body.d_t, 
    studentId: req.student.id,
    teacherId: req.body.teacherId
  }
  Meeting.create(newMeeting)
  .then(meeting => res.status(200).json(meeting))
  .catch(err => res.status(500).json({error: err}));
});

/******* STUDENT UPDATE A MEETING *********/
router.put('/student_update/:id', validateStudentSession, function(req, res){
  const updateMeeting = {
    d_t: req.body.d_t
  }

  const query = {
    where: {
      id: req.params.id,
      studentId: req.student.id
    }
  }

  Meeting.update(updateMeeting, query)
  .then(update => {
    if(update[0] === 0){
      return res.status(200).send("No matching meeting");
    }else{
      return res.status(200).json({data: update});
    }
  })
  .catch(err => res.status(500).json({error: err}));
});

/******** RETRIEVE MEETINGS BY STUDENT ID *********/
router.get('/student_get', validateStudentSession, function(req, res){
  Meeting.findAll({
    where:{
      studentId: req.student.id
    }
  })
  .then(meetings => res.status(200).json(meetings))
  .catch(err => res.status(500).json({error: err}))
});

/******** STUDENT DELETE A MEETING ********/
router.delete('/student_delete/:id', validateStudentSession, function(req, res){
  Meeting.destroy({
    where: {
      id: req.params.id,
      studentId: req.student.id
    }
  })
    .then(update => {
      if(update === 0){
        return res.status(200).send('No matching meeting found.')
      }else{
        return res.status(200).json({message: `${update} meetings removed`})
      }
    })
    .catch(err => res.status(500).json({error: err}));
});

/* ------------------ TEACHER ENDPOINTS ------------------------------*/

/******* TEACHER CREATE A MEETING *********/
router.post('/teacher_create', validateTeacherSession, function(req, res){
  //console.log(req.body);
  const newMeeting = {
    d_t: req.body.d_t, 
    teacherId: req.teacher.id,
    studentId: req.body.studentId
  }
  Meeting.create(newMeeting)
  .then(meeting => res.status(200).json(meeting))
  .catch(err => res.status(500).json({error: err}));
});

/******* TEACHER UPDATE A MEETING *********/
router.put('/teacher_update/:id', validateTeacherSession, function(req, res){
  const updateMeeting = {
    d_t: req.body.d_t
  }

  const query = {
    where: {
      id: req.params.id,
      teacherId: req.teacher.id
    }
  }

  Meeting.update(updateMeeting, query)
  .then(update => {
    if(update[0] === 0){
      return res.status(200).send("No matching meeting");
    }else{
      return res.status(200).json({data: update});
    }
  })
  .catch(err => res.status(500).json({error: err}));
});

/******** RETRIEVE MEETINGS BY TEACHER ID *********/
router.get('/teacher_get', validateTeacherSession, function(req, res){
  Meeting.findAll({
    where:{
      teacherId: req.teacher.id
    }
  })
  .then(meetings => res.status(200).json(meetings))
  .catch(err => res.status(500).json({error: err}))
});



/******** TEACHER DELETE A MEETING ********/
router.delete('/teacher_delete/:id', validateTeacherSession, function(req, res){
  Meeting.destroy({
    where: {
      id: req.params.id,
      teacherId: req.teacher.id
    }
  })
    .then(update => {
      if(update === 0){
        return res.status(200).send('No matching meeting found.')
      }else{
        return res.status(200).json({message: `${update} meetings removed`})
      }
    })
    .catch(err => res.status(500).json({error: err}));
});


module.exports = router;