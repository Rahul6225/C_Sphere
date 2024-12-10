import '../Styles/Attendance_admin.css'; 
import '../Styles/Footer.css';
import Footer from '../Common/Footer';

import {useState, useEffect} from 'react';

export default function Attendance() {

  // Logic to fetch student fullname and rollno from API ->
  const [studentData, setStudentData] = useState([]);

  const fetchData = async () => {
    try{
      const response = await fetch("http://localhost:4000/admin/student", {method : "GET",credentials: "include"});
      const data = await response.json();
      setStudentData(data);
    } catch(err) {
      console.log("Error while fetching attendance");
    }
  }

  useEffect(() => {
    fetchData();
  }, []); 

  // ------------------------------------------------------------------------------------------------------------------------------------------------
  // Logic to send request body to the API ->

  const [attendanceData, setAttendanceData] = useState({});

  // The second argument of useEffect ([studentData]) tells React to only run the effect when the studentData array changes.
  // After the data is fetched and studentData is populated (via setStudentData), useEffect will be triggered.

  useEffect(() => {
    // reduce() is a JavaScript array method that iterates over all elements in an array and accumulates a result into a single value (in this case, an object).

    const initialAttendance = studentData.reduce((acc, student) => {
      if (student.username !== "admin" && student.fullname) {
        acc[student.username] = 'present'; // Default value of 'present' for each student
      }
      return acc;
    }, {}); // <- Here, {} is the initial value of accumulator(acc)

    setAttendanceData(initialAttendance);

  }, [studentData]);


  // Updating the attendanceData state when a dropdown value changes ->
  const handleAttendanceChange = (username, value) => {
    if (value === 'absent') {
      setAttendanceData((prevData) => { // setter function can also take a callback arrow function, run logic inside the arrow function and return the updated value like this.
        const updatedArr = {...prevData}; // Create a copy of the target array
        updatedArr[username] = value; // Update the value at the given index
        return updatedArr;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission, which reloads the whole page on submission

    // Creating the request body object
    const requestBody = {
      rollnos: studentData.filter((student) => student.username !== "admin").map((student) => student.rollno),

      attendance: Object.entries(attendanceData).map(([username, status]) => ({ // Object.entries(attendanceData) will return an array of arrays
        username,
        status,
      }))
    };

    console.log(requestBody);

    // Sending the data to the backend API
    try {
      const response = await fetch("http://localhost:4000/admin/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include"
      });

      if (response.ok) {
        alert("Attendance submitted successfully!");
      } else {
        alert("Failed to submit attendance.");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Error submitting attendance.");
    }
  };
  
  // ----------------------------------------------------------------------------------------------------------
  return (
    <div>
      <h1 className='white-heading'>Attendance</h1>

      <main>
          {studentData.length > 0 && studentData.some(student => student.fullname)? (
            <form onSubmit={handleSubmit}>

            <div className="grid">
              {studentData.map((student, index) =>

                student.fullname && student.rollno && student.username !==  "admin" ? (

                    <div className="std-card" key={index}>
                      <img src={student.profileimg || "../images/Profile.png"} alt="Profile" 
                        style={{
                          borderRadius: "50%", // Rounds the corners
                          width: "100px", // Adjust as needed
                          height: "100px", // Adjust to maintain aspect ratio
                          objectFit: "cover" // Ensures the image scales correctly within the rounded frame
                        }}
                      />

                      <p>{student.fullname}</p>

                      <p>{student.rollno}</p>

                      <select
                        name="attendance"
                        id="attendance"
                        value={attendanceData[student.username] || 'present'}
                        onChange={(e) => handleAttendanceChange(student.username, e.target.value)}
                        className="attendance-dropdown"
                        required
                      >
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                      </select>
                    </div>

                ) : null
              )}
            </div>
            <div className='submit-btn-admin-div'>
              <button className="submit-btn-admin" type="submit">Submit</button>
            </div>
          </form>
          ) : (
            <h1 className='white-heading'>Nothing Yet !!</h1>
          )}

      </main>

      <section className="call-to-act">
        <h2>Take Control of Attendance Now!</h2>
        <p>Empower your teaching with easy attendance management.</p>
        <button id="btn-j">Update</button>
        <button id="btn-j">Modify</button>
      </section>

      <Footer/>
    </div>
  );
}
