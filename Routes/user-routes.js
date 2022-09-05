const router = require('express').Router();
const userController = require('../Controller/User.Controller');

router.get('/getOtp', userController.randomOTP);

router.post('/addUser', userController.ADD_USER);

router.post('/verifyOtp', userController.VERIFY_OTP);

module.exports = router;