import "../Styles/Attendance.css"
import {useState, useEffect} from 'react';

const Attendance = () => {

  const [studentData, setstudentData] = useState({});

  const [userName, setUserName] = useState("");

  let username = "";
  const fetchData = async () => {
    try{
      const response = await fetch(`http://localhost:4000/attendance/fetchAttendance`, {method : "GET", credentials : "include"});
      const data = await response.json();
      console.log(data);
      const {student, username } = data;
      setstudentData(student);
      setUserName(username);
    } catch(err) {
      console.log("Error in fetching single student data");
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div>
      <h1 className="white-heading">Attendance</h1>
      
      {userName ? (
        studentData.fullname ? (
          // When student is registered, and attendance is uploaded
          <div className="attendance-card">
            <p>
              <strong>Name:</strong> {studentData.fullname}
            </p>
            <p>
              <strong>Roll Number:</strong> {studentData.rollno}
            </p>
            <p>
              <strong>Attended:</strong> {studentData.attendance?.attended}
            </p>
            <p>
              <strong>Absent:</strong>{" "}
              {studentData.attendance?.delivered - studentData.attendance?.attended}
            </p>
            <p>
              <strong>Delivered:</strong> {studentData.attendance?.delivered}
            </p>
            <p>
              <strong>Total Percentage:</strong>{" "}
              {studentData.attendance?.percentage}%
            </p>
          </div>
        ) : (
          // When student is registered but attendance is not uploaded
          <div className="attendance-card">
            <h2>Not Uploaded Yet !!</h2>
          </div>
        )
      ) : (
        // When student is not registered and attendance is not uploaded
        <div className="attendance-card">
          <h2>Not Uploaded Yet !!</h2>
        </div>
      )}
    </div>
  );
};

export default Attendance;