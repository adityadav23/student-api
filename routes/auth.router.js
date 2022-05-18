const express= require('express');
const {createUser,
     login,
    } = require('../controllers/auth.controller');
const router = express.Router();

router.route('/signup').post(createUser);
router.route('/login').post(login);


module.exports = router;