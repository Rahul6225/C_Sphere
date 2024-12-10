import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you are using Axios for API requests
import '../Styles/edit_profile.css'
import { useNavigate } from 'react-router-dom';

const EditProfileImage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [passWord, setPassWord] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Fetch user profile details when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/student-info', {
          withCredentials: true, // To send cookies if necessary
        });

        const { username, profileimg } = response.data;
        console.log(username);
        console.log(profileimg);

        setUserName(username);
        setNewProfileImage(profileimg);

      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        alert('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage(reader.result); // <- This sets the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfileImage = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const formData = new FormData();

      formData.append('username', userName);

      const file = e.target.profileimg?.files[0];
      if (file) {
        formData.append("profileimg", file);
      }

      console.log(file);
  
      const response = await axios.post('http://localhost:4000/update-profile-pic', formData, {
        withCredentials: true,
      });
  
      if (response.status === 201) {
        alert('Profile image updated successfully!');
        navigate("/");
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
      alert('Failed to update profile image.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserValidation = async (e) => {
    e.preventDefault();
    setIsValidating(true);
  
    try {
      const response = await axios.post('http://localhost:4000/validate-password', {
        username: userName, // Pass username or identifier
        oldPassword: passWord, // Pass old password for validation
      });
  
      if (response.status === 200) {
        alert('User validated successfully!');
        navigate('/update-profile');
      }
    } catch (error) {
      alert('Validation failed! Please try again.');
      console.error('Error during validation:', error);
    } finally {
      setIsValidating(false);
    }
  };
  

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSaveProfileImage}>
        <div className="profile-image-container">
          <img
            src={newProfileImage || "/images/Profile.png"}
            alt="Profile"
            className="profile-picture"
          />
          <div className="edit-overlay">
            <label htmlFor="profileimg-upload" className="edit-icon">
              EDIT
            </label>
            <input
              id="profileimg-upload"
              type="file"
              name="profileimg"
              onChange={handleImageChange}
              accept="image/*"
              className="image-upload"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Profile Image'}
          </button>
        </div>
      </form>

      <form onSubmit={handleUserValidation}>
        <div className="form-group">
          <label htmlFor="password">Old Password</label>
          <input
            type="password"
            id="password"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isValidating}>
            {isValidating ? 'Validating...' : 'Validate User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileImage;
