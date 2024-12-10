const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const { Users , markAttendance}= require("../models/user");
const {verifyToken} = require("./auth");
console.log('admin routes loaded');

router.post("/attendance",verifyToken, (request, response) => {
  const stuDetails = request.body;
  console.log(stuDetails);

  markAttendance(stuDetails.rollnos, stuDetails.attendance);

  response.status(200).send("Attendance marked successfully");

})


// router.get("/student", verifyToken, async (request, response) => {

//   const students = await Users.find();

//   response.json(students);

//   // response.render("admin/student-info", {pageTitle : "Attendance", path : "/admin/student", students : students, user:request.session.user});

// })

router.get("/student", verifyToken, async (request, response) => {
  try {
    // Fetch all students
    const students = await Users.find();

    // Add profile image logic to each student
    const updatedStudents = students.map( (student) => {
      let profileimg = null;

      if (student.profileimg) {
        const { profileimgindex } = student;
        const filename = `profile-${profileimgindex}.png`;
        const filepath = path.join(__dirname, '..', 'uploads', 'profile-pictures', filename);

        // Check if the file exists
        if (fs.existsSync(filepath)) {
          profileimg = `http://localhost:4000/uploads/profile-pictures/${filename}`;
        }
      }

      // Overwrite the existing profileimg field with the new value
      const updatedStd = { ...student.toObject() }; // Convert Mongoose document to Javascript object using toObject()
      updatedStd.profileimg = profileimg;
      delete updatedStd.profileimgindex;
      return updatedStd;
    });

    // Send the response with updated students
    response.json(updatedStudents);

  } catch (error) {
    console.error("Error fetching students:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;