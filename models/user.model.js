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


// 1. Make an admin user manually in the database, and create JWD token for authorisation so that only admin can create the record in the database and access the database
// 3. Create student record : in which admin can create student record by sending student name, email id and mobile number and autogenerate timestamp.
//     1. Validate the user name with 4-25 character only no digits or special character allowed 
//     2. Validate the email id by proper email id format
//     3. Mobile number can have only 10 digits only, no character or special character allowed, mobile number should be unique in the database

// 4. Fetch all User: in which we can list the all the stored user
// 5. Delete any selected user
// 6. Edit any selected user ( with all validations)
// 7. Test your API in Postman to validate your Work
// 8. Publish your API on some testing server so that we can test form your given endpoints.