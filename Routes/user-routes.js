const router = require('express').Router();
const userController = require('../Controller/User.Controller');

router.get('/getOtp', userController.randomOTP);

router.post('/addUser', userController.ADD_USER);

module.exports = router;