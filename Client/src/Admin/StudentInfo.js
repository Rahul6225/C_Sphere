import '../Styles/Attendance.css';
import {useState, useEffect} from 'react';

export default function Info () {

  const [stdList, setStdList] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/admin/student", {method : "GET", credentials: "include"});
    const data = await response.json();
    console.log(data);
    setStdList(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {stdList.length === 0 || stdList.filter(student => student.fullname).length === 0 ? (
        <h1 className='white-heading'>Nothing Yet !!</h1>
      ) : (

        stdList.filter(student => student.fullname).map((student, index) => {
          
          const { fullname, rollno } = student;

          const attended = student.attendance?.attended ?? "N/A";
          const delivered = student.attendance?.delivered ?? "N/A";
          const percentage = student.attendance?.percentage ?? "N/A";

          return (
            <div className="attendance-card" key={index}>
              <h3>Attendance Info of {fullname}</h3>
              <p>
                <strong>Roll Number:</strong> {rollno}
              </p>
              <p>
                <strong>Attended:</strong> {attended}
              </p>
              <p>
                <strong>Delivered:</strong> {delivered}
              </p>
              <p>
                <strong>Total Percentage:</strong>{" "}
                {percentage !== "N/A" ? percentage + "%" : "N/A"}
              </p>
          </div>
          );
        })

      )}
    </div>
  );
};