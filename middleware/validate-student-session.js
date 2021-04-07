const jwt = require('jsonwebtoken');
const Student = require('../db').import('../models/student');

const validateStudentSession = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({auth: false, message: "No token provided."});
  }else{
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      if (!err && decodeToken) {
        Student.findOne({
          where: {
            id: decodeToken.id,
            role: decodeToken.role
          }
        })
        .then(student => {
          if (!student) throw err;
          req.student = student;
          return next();
        })
        .catch(err => next(err));
      }else{
        req.errors = err;
        return res.status(500).send('Not authorized');
      }
    });
  } 
};

module.exports = validateStudentSession;