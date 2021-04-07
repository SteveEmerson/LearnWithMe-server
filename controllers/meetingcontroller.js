const router = require('express').Router();
const Meeting = require('../db').import('../models/meeting');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session'); 

// Test endpoint
router.get('/test', function(req, res){
  res.send('Got to the meeting endpoint')
})

/******* CREATE A MEETING *********/
router.post('/create', validateSession, function(req, res){
  console.log(req.body);
  Meeting.create({d_t: req.body.d_t})
  .then(meeting => res.status(200).json(meeting))
  .catch(err => res.status(500).json({error: err}));
});

/******* UPDATE A MEETING *********/
router.put('/:id', validateSession, function(req, res){
  const updateMeeting = {
    d_t: req.body.d_t,
    userId: req.body.userId
  }

  const query = {
    where: {
      id: req.params.id
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



module.exports = router;