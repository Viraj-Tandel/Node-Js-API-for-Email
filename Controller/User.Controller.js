const USER = require('../Models/userModel');
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'viraj.170410116116@gmail.com',
        pass: 'kqzdkovicnpmhxoa',
    },
});

// * API TO GET THE OTP
module.exports.randomOTP = async (req, res) => {
    try {
        let userEmail = req.query.email;
        let currentUser;
        if (userEmail) {
            currentUser = await USER.findOne({
                userEmail
            });
        }
        if (!currentUser) {
            return res.status(200).send({
                data: [],
                message: "Email id is not valid",
                statusCode: 404
            });
        }

        if (!currentUser.isVarified) {
            let otpNo = generateRandomOTP();
            await USER.findOneAndUpdate({
                userEmail
            }, {
                otp: otpNo
            });
            sendEmail(otpNo, userEmail);
            res.status(200).send({
                data: [],
                message: "Otp is suceessfully send to your email check your inbox",
                statusCode: 200
            });
        }
    } catch (err) {
        console.log("CATCH BLOCK", err);
        res.status(500).send(err);
    }
};

// * API FOR ADDING USER
module.exports.ADD_USER = async (req, res) => {
    try {
        let userPayload = new USER();
        userPayload = req.body;
        let otp = generateRandomOTP();
        let isUser = await USER.findOne({
            email: userPayload.email
        });

        if (isUser) {
            return res.status(200).send({
                data: [],
                message: "User Already Exist with this email"
            })
        }
        await USER.create({
            email: userPayload.email,
            otp
        });

        sendEmail(otp, userPayload.email)
        res.status(200).send({
            data: [],
            message: "User added successfully"
        });
    } catch (error) {
        console.log('catch------>', error);
        res.status(500).send(error);
    }
}

// * API FOR VERIFY THE OTP
module.exports.VERIFY_OTP = async (req, res) => {
    try {
        let {
            email,
            otp
        } = req.body;
        let currentUser = await USER.findOne({
            email
        });
        if (!currentUser)
            return res.status(200).send({
                data: null,
                error: "User does not exist"
            });
        console.log(currentUser);
        if (currentUser.otp == otp) {
            await USER.findOneAndUpdate({
                email
            }, {
                isVarified: true
            })
            return res.status(200).send({
                data: [],
                message: "Verification Successful!"
            });
        } else {
            return res.status(200).send({
                data: [],
                message: "Verification Failed You have entered incorrect otp!"
            });
        }
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


function sendEmail(otpNumber, recipientEmail) {
    let mailOptions = {
        from: 'viraj.170410116116@gmail.com',
        to: `${recipientEmail}`,
        subject: 'Sending Email using Node.js',
        html: `<h1>Your otp: <strong>${otpNumber}</strong></h1>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("EMAIL Error-------->", err);
        } else {
            console.log("Email sent successfully-------------->", info);
        }
    });
    return mailOptions;
}