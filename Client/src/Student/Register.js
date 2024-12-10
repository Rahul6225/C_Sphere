import React from "react";
import {useState} from "react";
import "../Styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({}); // <- When handleChange is called for the 1st time, This object is the "prevFormData" object.

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      const updatedFormData = {...prevFormData}; // Spread operator(...) creates a shallow copy of the already existing formData object
      updatedFormData[e.target.name] = e.target.value;
      return updatedFormData;
    });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // This ensures cookies are sent with the requ
      });
      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "/";
      } else {
        console.log(response);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <header>Registration</header>

      <form onSubmit={handleSubmit}>

        <div className="form-first">
          <div className="personal-details">
            <span className="title">Personal Details:</span>
            <div className="fields">
              <div className="input-field">
                <label htmlFor="fullname">Full Name</label>
                <input type="text" name="fullname" placeholder="Enter your name" value = {formData.fullname} onChange={handleChange}/>
              </div>

              <div className="input-field">
                <label htmlFor="rollno">Roll Number</label>
                <input type="text" name="rollno" placeholder="Enter your roll number" value = {formData.rollno} onChange={handleChange}/>
              </div>

              <div className="input-field">
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" name="dob" value = {formData.dob} onChange={handleChange}/>
              </div>

              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Enter your email" value = {formData.email} onChange={handleChange}/>
              </div>

              <div className="input-field">
                <label htmlFor="mobno">Mobile Number</label>
                <input type="tel" name="mobno" placeholder="Enter your mobile number" value = {formData.mobno} onChange={handleChange}/>
              </div>

              <div className="input-field">
                <label htmlFor="gender">Gender</label>
                <select name="gender" onChange={handleChange}>
                  <option value="">
                    --select--
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Prefer not to say">Prefer Not to say</option>
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="father">Father's Name</label>
                <input type="text" name="father" placeholder="Enter your father's name" value = {formData.father} onChange={handleChange}/>
              </div>

              <div className="input-field">
                <label htmlFor="mother">Mother's Name</label>
                <input type="text" name="mother" placeholder="Enter your mother's name" value = {formData.mother} onChange={handleChange}/>
              </div>

              <div className="input-field">
                <label htmlFor="bldgrp">Blood Group</label>
                <input type="text" name="bldgrp" placeholder="Enter your blood group" value = {formData.bldgrp} onChange={handleChange}/>
              </div>

              <div className="input-field">
                <label htmlFor="city">City</label>
                <input type="text" name="city" placeholder="Enter your city" value = {formData.city} onChange={handleChange}/>
              </div>

              <div className="input-field">
                <label htmlFor="state">State</label>
                <input type="text" name="state" placeholder="Enter your state" value = {formData.state} onChange={handleChange}/>
              </div>

              <div className="input-field">
                <label htmlFor="nat">Nationality</label>
                <input type="text" name="nat" placeholder="Enter your nationality" value = {formData.nat} onChange={handleChange}/>
              </div>
            </div>
          </div>
        </div>

        <button className="Btn" type="submit" >
          <span className="btnText">Submit</span>
        </button>

      </form>
    </div>
  );
}

export default Register;