const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        validate: [validator.isAlpha, 'Please provide only alphabets!'],
        minlength: [4, 'username must be more than 4 chars!'],
        maxlength: [25, 'username must be less than 25 chars!'],
        
    },
    email:{
        type: String,
        required: [true,"Please provide email!"],
        unique: true,
        validate:[validator.isEmail, 'Please give valid email']
    },
    mobile:{
        type: Number,
        required: [true, "Please provide mobile number!"],
        unique: true,        
        validate: {
            validator: function(v) {
              return /^([0-9]{10}$)/.test(v);
        }},
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      },
    password:{
        type: String,
        required: [true,'Please provide your password!'],
        minlength: 8,
    },
})

userSchema.pre('save', async function(next){
    //Only run this function if password was actually modified
    if(!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    //Hash
    this.password = await bcrypt.hash(this.password, salt)
    next();

})


userSchema.methods.comparePassword = async function(candidatePassword)
{
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.createJWT = async function(id){
    const token = await jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token;
}
module.exports = mongoose.model('User',userSchema);