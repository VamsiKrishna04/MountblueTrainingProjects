const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
  // Send Decoded Token if verification succeds
  try {
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);    
    // const decoded = jwt.verify(token, 'secret');
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth Failed',
    });
  }
};
