const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const router = express.Router();

const { Users }= require('../models/user');

function tokenVerifier(req, res) {
  // Step 1: Extract token
  const token = req.cookies.token;

  if (!token) {
    throw new Error("Unauthorized: Token not found"); // Throw error if no token
  }

  // Step 2: Decode token
  const secretKey = process.env.JWT_SECRET || 'secret'; // Use the same secret key used to sign the token
  try {
    return jwt.verify(token, secretKey); // Decode and verify the token
  } catch (err) {
    throw new Error( err); // Throw error for invalid tokens
  }
}


router.post("/register", async (req, res) => {
  try {
    // Verify and decode token
    const decoded = tokenVerifier(req, res);

    // Ensure decoded token contains the required fields
    if (!decoded.username) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const username = decoded.username;
    const stuDetails = req.body; // Extract student details from request body

    // Update student details
    const updatedStd = await Users.findOneAndUpdate(
      { username }, // Match user by username
      { $set: stuDetails }, // Update with new details
      { new: true } // Return the updated document
    );

    // Handle case where user is not found
    if (!updatedStd) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Registration successful", user: updatedStd });
  } catch (err) {
    // Handle errors (e.g., token verification or database errors)
    console.error("Error in /register route:", err.message);
    res.status(500).json({ message: err.message || "Server error while registration" });
  }
});

router.get("/attendance/fetchAttendance", async (req, res) => {

  try {
    const decoded = tokenVerifier(req,res);
    const username = decoded.username;

    if (!username) {
      return res.status(400).json({ message: "username missing in token" });
    }

    // Step 3: Query database
    const student = await Users.findOne({ username });

    if (!student.attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    // Step 4: Respond with attendance data
    res.json({student, username});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
  
})

router.get("/student-info", async (req, res) => {

  try {
    const decoded = tokenVerifier(req,res);
    const username = decoded.username;

    if (!username) {
      return res.status(400).json({ message: "username missing in token" });
    }

    // Step 3: Query database
    const student = await Users.findOne({ username });

    if (!student) { 
      return res.status(404).json({ message: "User not found" });
    }

    let profileimg = null;

    if(student.profileimg) {
      const { profileimgindex } = student;
      const filename = `profile-${profileimgindex}.png`;
      const filepath = path.join(__dirname, '..', 'uploads', 'profile-pictures', filename);
    
      if (fs.existsSync(filepath)) { // Checking whether the "profileimg" value present in mongoDB matches the file present in uploads folder. 
        profileimg = `http://localhost:4000/uploads/profile-pictures/${filename}`; // PROFILE PICTURE MUST BE IN PNG FORMAT
      }
    }
    
    // Step 4: Respond with student data
    res.json({student, username, profileimg});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }  
})

// --------------------------------------------------------------------------------------------------------------------------------------------------

// Single multer setup for both medicals and profile-pics ->

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dynamically set the destination folder based on the route or request data
    if (req.url === '/medical-form-submit') {
      cb(null, 'uploads/medicals');
    } else if (req.url === '/update-profile-pic') {
      cb(null, 'uploads/profile-pictures');
    } else {
      cb(new Error('Invalid upload route'), null); // Reject the upload
    }
  },
  filename: (req, file, cb) => {
    const decoded = tokenVerifier(req, res); // Decode token to get user details
    let uniqueSuffix;
    
    if (req.url === '/medical-form-submit') {
      uniqueSuffix = `medical-${Math.floor(Math.random() * 90) + 10}`;
    } else if (req.url === '/update-profile-pic') {
      uniqueSuffix = `profile-${Math.floor(Math.random() * 90) + 10}`;
    } else {
      return cb(new Error('Invalid upload route'), null);
    }
    
    const extension = file.mimetype.split('/')[1]; // Extract file extension
    cb(null, uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage });


router.post("/medical-form-submit", upload.single("file"), async (req, res) => {

  // .single("file") => This specifies that the request expects a single file to be uploaded. The string "file" corresponds to the name attribute of the file input field in the frontend React HTML form.
  try {
    const { name, rollNumber, department, startDate, endDate } = req.body;
    console.log(req.body);
    console.log(req.file.path);

    // Create and save a new document
    const student = await Users.findOne({rollno : Number(rollNumber), fullname : name.trim()});

    console.log("Student document from mongoDB -> ", student);

    const newMedicalRecord = {
      department,
      startDate,
      endDate,
      filePath: req.file.path, // Save the uploaded file's path
    };

    student.medicalRecords.push(newMedicalRecord);

    await student.save();

    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/update-profile-pic", upload.single("profileimg"), async (req, res) => {
  try {
    console.log("This is request body -> ", req.body); // Contains the username

    const {username} = req.body;

    // request.file (or request.files in the case of multiple files) is a property that is automatically added to the request object by Multer, a middleware used for handling multipart/form-data requests, such as file uploads.
    console.log("This is the uploaded file -> ", req.file); // Contains the profile image file

    const student = await Users.findOne({username});

    student.profileimg = req.file.path;

    const filePath = req.file.path; // Example: 'uploads\\profile-pictures\\profile-67.png'
    const parts = filePath.split('\\'); // Split by '\\'
    const filename = parts[parts.length - 1]; // Get the last part (profile-67.png)
    const fileParts = filename.split('-'); // Split the filename by '-'
    const number = fileParts[1].split('.')[0]; // Get the number before the extension

    student.profileimgindex = number;

    await student.save();

    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).json({ error: "Profile image Data not saved to DBMS" });
  }
});

// --------------------------------------------------------------------------------------------------------------------------------------------------

// Password validation endpoint
router.post('/validate-password', async (req, res) => {
  const { username, oldPassword } = req.body;

  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password); // Validate password
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Password validated successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user details endpoint
router.post('/update-user', async (req, res) => {
  const {oldUsername, username, password, fullname, rollno, email, mobno} = req.body;
  console.log(req.body);

  try {
    const student = await Users.findOne({ username : oldUsername });
    if (!student) {
      return res.status(404).json({ error: 'User not found' });
    }

    if(oldUsername !== username) { // Destroy the cookie if the username is changed
      res.clearCookie('token', {
        httpOnly: true,
        
      });
    }

    if (username) student.username = username;
    if (password) student.password = password; // You might want to hash passwords before saving
    if (fullname) student.fullname = fullname;
    if (rollno) student.rollno = rollno;
    if (email) student.email = email;
    if (mobno) student.mobno = mobno;

    await student.save();

    return res.status(200).json({ message: 'User details updated successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;