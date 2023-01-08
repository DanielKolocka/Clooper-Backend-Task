const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    first_name : {
        type: String,
        required: [true, 'Please enter your first name'],
        trim: true,
        maxLength: [30, 'Name can not exceed 30 characters.']
    },
    last_name : {
        type: String,
        required: [true, 'Please enter your last name'],
        trim: true,
        maxLength: [30, 'Last name can not exceed 30 characters.']
    },
    email : {
        type: String,
        required: [true, 'Please enter your email address.'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address.'],
    },
    phone : {
        type: Number,
        required: [true, 'Please enter your phone number'],
        trim: true,
        maxLength: [10, 'Phone number can not exceed 10 digits']
    },
    is_admin : {
        type: Boolean,
        default: false
    },
    is_active : {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);

