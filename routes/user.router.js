const express= require('express');
const {updateUser,
    deleteUser,
    createStudent,
    getAllUsers} = require('../controllers/user.controller')
const router = express.Router();

router.route('/').get(getAllUsers).post(createStudent);
router.route('/:userId').patch(updateUser).delete(deleteUser);


module.exports = router;