const router = require('express').Router();
const Meeting = require('../db').import('../models/meeting');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session'); 

// Test endpoint
router.get('/usertest', function(req, res){
  res.send('Got to the user endpoint')
})