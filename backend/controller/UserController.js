const usermodel= require('../model/User');
const {generateToken} = require('../jwt')
const bcrypt = require('bcrypt')
exports.userSignup= async(req,res)=>{
    try {
          const newUser = new usermodel(req.body);

         
          const response=  await newUser.save();
        const token = generateToken(response.id);
        console.log(token);
       
        console.log('data saved');
          res.status(201).json({response:response});
    } catch (error) {
         console.log(error);
         res.status(500).send("errro creating user");
    }
}


exports.userSignin= async(req,res)=>{
      try {
           
            const {aadharCardNumber, password} = req.body;
            if (!aadharCardNumber || !password) {
                return res.status(400).json({ error: 'Aadhar Card Number and password are required' });
            }
           const user = await usermodel.findOne({aadharCardNumber:aadharCardNumber});

            if(!user || !(await user.isValidPassword(password)))
            {
              return  res.status(401).json({error:'Invalid adhar card number or password'});
            }
            const token = generateToken(user.id);
            
            res.status(201).send({token});
      } catch (error) {
        
          console.log(error);
          res.status(500).send({message:"interval server error"});
      }
}





exports.profile = async (req, res) => {
  try {
    // Use req.user information to find the user by ID or any relevant identifier
    const data = await usermodel.findById(req.user.id); // Assuming the decoded token contains an id field
    res.status(200).json({data});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.profilepassword = async (req, res) => {
  try {
         const {currentPassword,newPassword} = req.body;
    const data = await usermodel.findById(req.user.id); 
    if (!data || !(await data.isValidPassword(currentPassword))) {
      return res.status(401).json({ error: 'Invalid current password' });
  }

  const salt = await bcrypt.genSalt(10); // 10 rounds is generally considered safe
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  data.password = hashedPassword;

  
     
  await data.save();

  res.status(200).send('Password updated successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};