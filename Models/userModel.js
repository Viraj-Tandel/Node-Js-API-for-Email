const mongoose = require('mongoose');
const validatorPac = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true],
        validate: {
            validator: validatorPac.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },
    created: {
        type: String,
        default: new Date().toISOString(),
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);