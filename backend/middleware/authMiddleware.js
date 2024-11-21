const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).send('No token provided, authorization denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) {
      return res.status(404).send('User not found');
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send('Token is invalid or expired');
  }
};

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = decoded;

      // Check if user exists in database (optional, depending on your setup)
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized, token verification failed or expired' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized, no token provided' });
  }
};

module.exports = { authMiddleware, protect };
