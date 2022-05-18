const User = require('../models/user.model');
const Student = require('../models/student.model')

async function createStudent(req,res){
    try {
        const userId = req.user.id;
        const user = await User.findOne({_id:userId});
        //if user not found
        if(!user){
            res.status(400).json({
                status: "failed",
                msg: "User not found"
            })
        }
        //If user is not admin
        if(user.role != "admin"){
            res.status(400).json({
                status: "failed",
                msg: "Only admin can add new student"
            })
        }
        const { name , email, mobile} = req.body;

        const student = await Student.create({name, email, mobile});

        res.status(201).json({
            status: "success",
            msg: "Student created",
            student
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            error: err
        })
    }
}

async function getAllUsers(req,res){
    try {
        
        const userId = req.user.id;
        const user = await User.findOne({_id:userId});
        //If user is not admin
        if(user.role != "admin"){
            res.status(400).json({
                status: "failed",
                msg: "Only admin can add new student"
            })
        }
        const users = await User.find()
        
        res.status(200).json({
            status: "success",
            data: {
                users
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error
        })
    }
}

async function updateUser(req,res){
    try {
        
        const userId = req.user.id;
        const user = await User.findOne({_id:userId});
        //If user is not admin
        if(user.role != "admin"){
            res.status(400).json({
                status: "failed",
                msg: "Only admin can add new student"
            })
        }

        const userToUpdate = await User.findByIdAndUpdate(
            {_id: req.params.userId},
            req.body,
            {
                new: true,
                runValidators: true
            })
        res.status(200).json({
            status: "success",
            data:{
                userToUpdate,
            }
        })
        
    } catch (error) {
       res.status(400).json({
           status: "failed",
           data:{
               msg: "Cannot update user"
           }
       })
    }
   }
   
   async function  deleteUser(req,res){
       try {
           
        const userId = req.user.id;
        const user = await User.findOne({_id:userId});
        //If user is not admin
        if(user.role != "admin"){
            res.status(400).json({
                status: "failed",
                msg: "Only admin can add new student"
            })
        }

           const userToDelete = await User.findOneAndDelete(
              {_id: req.params.userId},
              )
   
           if(!userToDelete){
              return res.status(400).json({
                   status: "User not found to delete",
                   data:{
                       msg: error
                   }
               })
           }
           return res.status(204).json({
               status: "user deleted",
           })
       } catch (error) {
           res.status(400).json({
               status: "failed",
               data:{
                   msg: "Cannot delete user"
               }
           })
       }
   }
   
module.exports = { createStudent,
    deleteUser,
    updateUser,
    getAllUsers,
}