const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session'); 

// Test endpoint
router.get('/usertest', function(req, res){
  res.send('Got to the user endpoint')
})

/****** USER CREATE ******/
router.post('/register', function(req, res){
  let newUser = {
    email: req.body.email,
    passwordhash: bcrypt.hashSync(req.body.password, 12),
    name: req.body.name,
    partnerList: [],
    role: req.body.role,
    availability: {}
  };

  User.create(newUser)
  .then((user) => {
    let token = jwt.sign(
      {id: user.id}, 
      process.env.JWT_SECRET, 
      {expiresIn: 60*60*24}
    )
    res.status(200).json(
      {
        userId: user.id,
        displayName: user.name,
        role: user.role,
        sessionToken: token
      }
    );
    
  })
  .catch(err => {
    return res.status(500).json({error: err, message:"Failed to register new user"})
  });
});

/****** USER LOGIN ******/
router.post('/signin', function(req, res){
  
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then((user) => {
    if (user){
      bcrypt.compare(req.body.password, user.passwordhash, (err, matches) => {
        if (matches) {
          let token = jwt.sign(
            {id: user.id}, 
            process.env.JWT_SECRET, 
            {expiresIn: 60*60*24}
          );
          res.status(200).json(
            {
              userId: user.id,
              displayName: user.name,
              partnerList: user.partnerList,
              role: user.role,
              availability: user.availability,
              sessionToken: token
            }
          );
        }else{
          res.status(502).json({error: "Login failed"});
        }
      });
    }else{
      res.status(500).json({error: "User not found"});
    }
  })
  .catch(err => {
    return res.status(500).json({error: err, message:"Failed to login teacher"})
  });
});

/******** USER UPDATE INFO *********/
router.put('/:id',validateSession, function(req, res){
  const updateUserInfo = {
    email: req.body.email,
    //passwordhash: bcrypt.hashSync(req.body.password, 12),  //v2.0 feature
    name: req.body.name,
    partnerList: req.body.partnerList,
    availability: req.body.availability
  }

  const query = {where: {id: req.params.id}}

  User.update(updateUserInfo, query)
    .then(update => {
      if(update[0] === 0){
        return res.status(200).send('No matching user found.')
      }else{
        return res.status(200).json({data: update, message: `${update[0]} Users updated`})
      }
    })
    .catch(err => res.status(500).json({error: err}))
});

/******** RETRIEVE USER BY ID *********/
router.get('/:id', validateSession, function(req, res){
  User.findOne({
    where:{
      id: req.params.id
    }
  })
  .then(user => res.status(200).json(user))
  .catch(err => res.status(500).json({error: err}))
});

/******** RETRIEVE USERS BY ROLE *********/
router.get('/', validateSession, function(req, res){
  User.findAll({
    where:{
      role: req.body.role
    }
  })
  .then(users => res.status(200).json(users))
  .catch(err => res.status(500).json({error: err}))
});

module.exports = router;