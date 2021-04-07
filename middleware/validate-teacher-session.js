const jwt = require('jsonwebtoken');
const Teacher = require('../db').import('../models/teacher');

const validateTeacherSession = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({auth: false, message: "No token provided."});
  }else{
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      if (!err && decodeToken) {
        Teacher.findOne({
          where: {
            id: decodeToken.id,
            role: decodeToken.role
          }
        })
        .then(teacher => {
          if (!teacher) throw err;
          req.teacher = teacher;
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

module.exports = validateTeacherSession;