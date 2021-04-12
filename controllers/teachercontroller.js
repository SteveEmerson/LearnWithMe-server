const router = require('express').Router();
const Teacher = require('../db').import('../models/teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateTeacherSession = require('../middleware/validate-teacher-session'); 

// Test endpoint
router.get('/teachertest', function(req, res){
  res.send('Got to the teacher endpoint')
})

/****** TEACHER CREATE ******/
router.post('/register', function(req, res){
  let newTeacher = {
    email: req.body.email,
    passwordhash: bcrypt.hashSync(req.body.password, 12),
    name: req.body.name,
    studentList: [],
    role: "teacher",
    availability: {}
  };

  Teacher.create(newTeacher)
  .then((teacher) => {
    let token = jwt.sign(
      {id: teacher.id, role: teacher.role}, 
      process.env.JWT_SECRET, 
      {expiresIn: 60*60*24}
    )
    res.status(200).json(
      {
        userId: teacher.id,
        displayName: teacher.name,
        role: teacher.role,
        sessionToken: token
      }
    );
    
  })
  .catch(err => {
    return res.status(500).json({error: err, message:"Failed to register new teacher"})
  });
});

/****** TEACHER LOGIN ******/
router.post('/signin', function(req, res){
  
  Teacher.findOne({
    where: {
      email: req.body.email
    }
  })
  .then((teacher) => {
    if (teacher){
      bcrypt.compare(req.body.password, teacher.passwordhash, (err, matches) => {
        if (matches) {
          let token = jwt.sign(
            {id: teacher.id, role: teacher.role}, 
            process.env.JWT_SECRET, 
            {expiresIn: 60*60*24}
          );
          res.status(200).json(
            {
              userId: teacher.id,
              email: teacher.email,
              displayName: teacher.name,
              studentList: teacher.studentList,
              role: teacher.role,
              availability: teacher.availability,
              sessionToken: token
            }
          );
        }else{
          res.status(502).json({error: "Login failed"});
        }
      });
    }else{
      res.status(500).json({error: "Teacher not found"});
    }
  })
  .catch(err => {
    return res.status(500).json({error: err, message:"Failed to login teacher"})
  });
});

/******** TEACHER UPDATE INFO *********/
router.put('/:id',validateTeacherSession, function(req, res){
  const updateTeacherInfo = {
    email: req.body.email,
    //passwordhash: bcrypt.hashSync(req.body.password, 12),  //v2.0 feature
    name: req.body.name,
    studentList: req.body.partnerList,
    availability: req.body.availability
  }

  const query = {where: {id: req.params.id}}

  Teacher.update(updateTeacherInfo, query)
    .then(update => {
      if(update[0] === 0){
        return res.status(200).send('No matching teacher found.')
      }else{
        return res.status(200).json({data: update, message: `${update[0]} Teachers updated`})
      }
    })
    .catch(err => res.status(500).json({error: err}))
});

/******** RETRIEVE TEACHER BY ID *********/
router.get('/:id', validateTeacherSession, function(req, res){
  Teacher.findOne({
    where:{
      id: req.params.id
    }
  })
  .then(teacher => {
    console.log("Got to here in teacherfetch")
    res.status(200).json(teacher)})
  .catch(err => res.status(500).json({error: err}))
});

/******** RETRIEVE ALL TEACHERS *********/
router.get('/', validateTeacherSession, function(req, res){
  Teacher.findAll()
  .then(teacher => {
    console.log("TEACHER FETCH")
    res.status(200).json(teacher)})
  .catch(err => res.status(500).json({error: err}))
});

module.exports = router;


