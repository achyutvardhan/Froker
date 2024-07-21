const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    // Extract user details from request
    const { phoneNumber, email, name, dob, monthlySalary } = req.body;

    // Check age and salary validation
    const age = calculateAge(dob);
    if (age <= 20) return res.status(400).send('User must be above 20 years of age.');
    if (monthlySalary < 25000) return res.status(400).send('Monthly salary must be 25k or more.');

    // Register user
    try {
        const newUser = new User({ phoneNumber, email, name, dob, monthlySalary, status: 'approved' });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    // Extract email and password from request
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid credentials');

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.borrowMoney = async (req, res) => {
    // Extract borrow amount from request
    const { amount } = req.body;

    try {
        // Find user and update Purchase Power
        const user = await User.findById(req.user.id);
        user.purchasePower += amount;

        // Calculate repayment
        const tenure = 12; // 12 months
        const interestRate = 0.08;
        const monthlyRepayment = (amount + (amount * interestRate)) / tenure;

        await user.save();
        res.json({ purchasePower: user.purchasePower, monthlyRepayment });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Helper function to calculate age
const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age;
};
