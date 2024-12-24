const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const upload = require('../middlewares/upload');
const { generateToken } = require('../utils/jwt');

const router = express.Router();

// Signup Route
router.post('/signup', upload.single('image'), async (req, res) => {
    const { username, email, password } = req.body;
    const image = req.file ? req.file.path : null;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            image,
        });

        const token = generateToken(newUser);

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                username: newUser.username,
                email: newUser.email,
                image: newUser.image,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                username: user.username,
                email: user.email,
                image: user.image,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
