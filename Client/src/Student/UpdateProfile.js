import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/edit_profile.css';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/update-user', 
        formData,
        {withCredentials : true}
      );
      if (response.status === 200) {
        alert('Profile updated successfully!');
        alert('Please Login again');
        navigate("/");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const fetchData = async () => {
    try{
      const response = await fetch(`http://localhost:4000/student-info`, {method : "GET", credentials : "include"});
      const data = await response.json();
      console.log(data);
      const {student, username} = data;
      const {fullname, rollno, email, mobno } = student;
      
      // Populate the formData with the fetched data
      setFormData({
        oldUsername : username || '',
        username: username || '',
        password: '', // Leave password blank
        fullname: fullname || '',
        rollno: rollno || '',
        email: email || '',
        mobno: mobno || '',
      });

    } catch(err) {
      console.log("Error in fetching single student data");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="edit-profile-container">
      <h2>Update Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Fullname</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollno">Roll Number</label>
          <input
            type="text"
            id="rollno"
            name="rollno"
            value={formData.rollno}
            onChange={handleChange}
          />
        </div>
        {/* Add other fields as necessary */}
        <div className="form-actions">
          <button type="submit"> Save Changes </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
