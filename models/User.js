const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    dob: {
        type: Date,
        required: true
    },
    monthlySalary: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'rejected'],
        default: 'approved'
    },
    password: {
        type: String,
        required: true
    },
    purchasePower: {
        type: Number,
        default: 0
    }
});

// Encrypt password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
