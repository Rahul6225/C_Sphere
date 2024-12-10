const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Users} = require('../models/user');

const router = express.Router();
console.log("auth routes loaded");

const verifyToken = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.token;
    console.log("token: ",token);

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    // Verify the token using the secret
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Attach the decoded user data to the request object
        req.user = decoded;
        //res.json({ message:  userId: decoded. });
        next(); // Proceed to the next middleware or route handler
    });
};

// Signup route
router.post('/signup', async (req, res) => {
    console.log("Sign up post request received");
    console.log(req.body);
    const { username, password } = req.body;
    try {
        const existingUsers = await Users.findOne({ username });
        if (existingUsers) return res.status(400).json({ message: "Users already exists" });
        await Users.create({ username, password });
        res.status(201).json({ message: "Users created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    console.log("received request");
    const { username, password } = req.body;
    try {
        const user = await Users.findOne({ username });
        if (!user) return res.status(404).json({ message: "Users not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

       
        
        const token = jwt.sign({ username : user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        

        // Send token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        
    });
    res.status(200).json({ message: "Logged out successfully" });
});

// Protected route example
router.get('/verify', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        res.status(200).json({ message: "Protected data", username: decoded.username });
    });
}); 

module.exports = {router, verifyToken};
 