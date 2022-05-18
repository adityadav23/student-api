const User = require('../models/user.model');


async function createUser(req, res){
    try {
        const queryObj = {};
        const {name, email, mobile, password} = req.body;
    
        const userObj = Object.assign({
                        name,
                        email,
                        mobile,
                        password,
                    },queryObj);
        
        const user = await User.create(userObj);
        const token = await user.createJWT(user._id);

        res.status(201).json({
            status: "success",
            data:{
                user,
                token,
            }
        })
    } catch (error) {
        res.status(201).json({
            status: "failed",
            msg: error
        })
    }
}

async function login(req, res){
   try{ 
       const { email, password } = req.body
    //validating email and password provided
      if (!email || !password) {
        throw new Error('Please provide email and password')
      }
      //find employee in db
      const user = await User.findOne({ email })

      //if employee doesn't exist
      if (!user) {
        throw new Error('Invalid Credentials')
      }
      //check if password is correct
      const isPasswordCorrect = await user.comparePassword(password)

      //if password incorrect
      if (!isPasswordCorrect) {
        throw new Error('Invalid Credentials')
      }
      
      //create jwt token using instance method after successful authentication
      const token = await user.createJWT(user._id);
      res
      .status(200)
      .json({ user: { name: user.name }, token })
    }catch(error){
        res.status(201).json({
            status: "failed",
            error
        })
    }
}
module.exports = {createUser,
login,}