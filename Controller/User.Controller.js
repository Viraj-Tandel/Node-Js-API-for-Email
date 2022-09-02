const USER = require('../Models/userModel');

module.exports.randomOTP = async (req, res) => {
    try {
        console.log("TRY BLOCK");
        let otpNo = generateRandomOTP();
        res.status(200).send(otpNo.toString());
    } catch (err) {
        console.log("CATCH BLOCK", err);
        res.status(500).send(err);
    }

};


module.exports.ADD_USER = async (req, res) => {
    try {
        let userPayload = new USER();
        userPayload = req.body;
        let otp = generateRandomOTP();
        await USER.create({
            email: userPayload.email,
            otp
        })
        res.send("User Added Successfully!");
    } catch (error) {
        console.log('catch');
        res.status(500).send(error);
    }
}

module.exports.VERIFY_OTP = async (req, res) => {
    try {
        let otp = req.otp;
        let currentUser = "";
    } catch (error) {
        res.status(500).send(error);
    }
}




// * helper function to genrate 6 digit otp
function generateRandomOTP() {
    let otpNumber = Math.floor(Math.random() * 1000000);
    console.log(otpNumber);
    return otpNumber;
}