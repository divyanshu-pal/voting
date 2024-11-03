const jwt = require('jsonwebtoken');

const authenticateToken=(req,res,next) =>{

    const authHeader = req.headers['authorization'];//req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if(!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        //verify jwt token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded
      next();
      
    } catch (err) {
      console.log('Invalid token:', err.message);
      res.status(401).json({ error: 'Invalid token' });
    }
  }
const generateToken=(userId)=>{

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn:30000 });
    console.log(token);
    return token;
  }


  module.exports = { authenticateToken,generateToken};