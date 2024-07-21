const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    tenure: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        default: 0.08
    },
    monthlyRepayment: {
        type: Number,
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Borrow', BorrowSchema);
