const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
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
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Student', studentSchema);