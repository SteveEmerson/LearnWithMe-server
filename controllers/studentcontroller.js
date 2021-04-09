const router = require('express').Router();
const Student = require('../db').import('../models/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateStudentSession = require('../middleware/validate-student-session'); 

// Test endpoint
router.post('/', function(req, res){
  res.send('Got to the student endpoint')
})

/****** STUDENT CREATE ******/
router.post('/register', function(req, res){
  let newStudent = {
    email: req.body.email,
    passwordhash: bcrypt.hashSync(req.body.password, 12),
    name: req.body.name,
    teacherList: [],
    role: "student",
    availability: null
  };

  Student.create(newStudent)
  .then((student) => {
    let token = jwt.sign(
      {id: student.id, role: student.role}, 
      process.env.JWT_SECRET, 
      {expiresIn: 60*60*24}
    )
    res.status(200).json(
      {
        userId: student.id,
        displayName: student.name,
        role: student.role,
        sessionToken: token
      }
    );
    
  })
  .catch(err => {
    return res.status(500).json({error: err, message:"Failed to register new student"})
  });
});

/****** STUDENT LOGIN ******/
router.post('/signin', function(req, res){
  
  Student.findOne({
    where: {
      email: req.body.email
    }
  })
  .then((student) => {
    if (student){
      bcrypt.compare(req.body.password, student.passwordhash, (err, matches) => {
        if (matches) {
          let token = jwt.sign(
            {id: student.id, role: student.role}, 
            process.env.JWT_SECRET, 
            {expiresIn: 60*60*24}
          );
          res.status(200).json(
            {
              userId: student.id,
              displayName: student.name,
              teacherList: student.teacherList,
              role: student.role,
              availability: student.availability,
              sessionToken: token
            }
          );
        }else{
          res.status(502).json({error: "Login failed"});
        }
      });
    }else{
      res.status(500).json({error: "Student not found"});
    }
  })
  .catch(err => {
    return res.status(500).json({error: err, message:"Failed to login student"})
  });
});

/******** STUDENT UPDATE INFO *********/
router.put('/:id',validateStudentSession, function(req, res){
  const updateStudentInfo = {
    email: req.body.email,
    //passwordhash: bcrypt.hashSync(req.body.password, 12),  //v2.0 feature
    name: req.body.name,
    teacherList: req.body.partnerList,
    availability: req.body.availability
  }

  const query = {where: {id: req.params.id}}

  Student.update(updateStudentInfo, query)
    .then(update => {
      if(update[0] === 0){
        return res.status(200).send('No matching student found.')
      }else{
        return res.status(200).json({data: update, message: `${update[0]} students updated`})
      }
    })
    .catch(err => res.status(500).json({error: err}))
});

/******** RETRIEVE STUDENT BY ID *********/
router.get('/:id', validateStudentSession, function(req, res){
  Student.findOne({
    where:{
      id: req.params.id
    }
  })
  .then(student => res.status(200).json(student))
  .catch(err => res.status(500).json({error: err}))
});

/******** RETRIEVE ALL STUDENTS *********/
router.get('/', validateStudentSession, function(req, res){
  Student.findAll()
  .then(student => {
    console.log("STUDENT FETCH")
    res.status(200).json(student)})
  .catch(err => res.status(500).json({error: err}))
});


module.exports = router;


