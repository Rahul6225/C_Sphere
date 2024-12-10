import React,{useState} from 'react'
import '../Styles/Medical.css'


const Medical = () => {
    const [formData, setFormData] = useState({});

      const handleFileChange = (e) => {
        const file = e.target.files[0]; // e.target.files is a FileList object (similar to an array) that contains all the files selected by the user. It holds a list of file objects, where each file corresponds to a selected file.
        console.log(file);
        
        setFormData((prevData) => {
          const updatedData = {...prevData};
          updatedData.file = file;
          return updatedData;
        });
      };
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
          const updatedData = {...prevData};
          updatedData[name] = value;
          return updatedData;
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData(); // FormData is an inbuilt javascript class  which automatically sets the Content-Type to multipart/form-data. We can't set Content-Type manually for multipart/form-data inside the object containing method, headers, body etc. Hence, we use FormData class.

        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        try {
          const response = await fetch("http://localhost:4000/medical-form-submit", {
            method: "POST",
            body: formDataToSend,
            credentials : "include"
          });

          if (response.ok) {
            console.log("Form submitted successfully!");
            alert("Medical Leave Applied !");
          } else {
            console.error("Submission failed");
            alert("Submission failed!");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
  return (
    <form className='medical-form' onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Roll Number:</label>
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Upload Supporting Document:</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Apply</button>
    </form>
  )
}

export default Medical;
