import { useState, useEffect, useCallback } from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed and imported

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default: Not authenticated
  const [isAdmin, setIsAdmin] = useState(false); // Default: Not admin
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Manage dropdown visibility
  const [newProfileImage, setNewProfileImage] = useState(null); // Manage Profile image update

  // Check authentication status when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth/verify", {
          withCredentials: true, // Send cookies for auth
        });

        // Ensure valid response data
        const userData = response.data;
        if (userData && userData.username) {
          setIsAuthenticated(true); // User is authenticated
          console.log("Fullname:", userData.username);
          setIsAdmin(userData.username === "admin"); // Check if admin
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error.response?.data || error.message);
        setIsAuthenticated(false); // Not authenticated
      }
    };
    checkAuth();
  }, []);
 
  // Function to handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true } // Send cookies to server
      );
      setIsAuthenticated(false); // Update state
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };


  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev); // Toggle state
  }; 


  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('dropdownMenu');
      const profilePic = document.querySelector('.profile-pic');
      if (dropdown && !dropdown.contains(event.target) && event.target !== profilePic) {
        
        // The "event.target" refers to the element that was clicked.
        // "dropdown.contains(event.target)" checks if the element, that is clicked anywhere on the website, is present inside the dropdownMenu div or not. If not it returns false, else true.
        // Basically the above condition doesn't close the dropdownMenu when the profile-pic is clicked again. That's why the logic for the same is set inside the toggleDropdown function (i.e. !prev)

        setIsDropdownVisible(false); // Close dropdown if clicked outside
      }
    };

    // Add event listener to handle click outside the dropdown ->

    window.addEventListener('click', handleClickOutside); // This adds an event listener to the window object that listens for click events. Whenever a click happens anywhere on the page, the handleClickOutside function is invoked.

    // Cleanup listener on component unmount ->

    return () => { // The return function in useEffect is a cleanup function that is called when the component unmounts. This ensures that the event listener is removed when the component is no longer in the DOM, preventing potential memory leaks or unnecessary operations.
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/student-info", {method : "GET", credentials: "include"});
    const data = await response.json();
    console.log("Profile image url -> ", data.profileimg);
    setNewProfileImage(data.profileimg);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <nav className="navbar">
        <img src="/images/Logo.png" alt="Campus Sphere" />

        <ul className="nav-list">
          <li><NavLink to={isAdmin ? "/admin" : "/"} end>Home</NavLink></li>
          <li><NavLink to={isAdmin ? "/admin/student" : "/student"}>Student Info</NavLink></li>
          <li><NavLink to={isAdmin ? "/admin/attendance" : "/attendance"}>Attendance</NavLink></li>
          <li><NavLink to={isAdmin ? "/admin/performance" : "/performance"}>Performance</NavLink></li>
          <li><NavLink to = {isAdmin ? "/admin/contact" : "/contact"}>Contact Us</NavLink></li>
          <li><NavLink to="/payment">Payment</NavLink></li>
          <div className="auth-buttons" style={isAuthenticated ? { padding: "0px" } : { padding: "15px" }}>
            {isAuthenticated ? (
                <div className="profile-container">
                  <img 
                    src={newProfileImage || "/images/Profile.png"}
                    alt="Profile Picture" 
                    className="profile-pic"
                    onClick={toggleDropdown}
                  />

                  {isDropdownVisible && (
                    <div class="dropdown-menu" id="dropdownMenu">
                      <NavLink className="link" to='/edit-profile'>Edit Profile</NavLink>
                      <NavLink className="link" onClick={handleLogout}>Logout</NavLink>
                    </div>
                  )}
                  
                </div>
            ) : (
              <>
                <NavLink className="signup" to="/signup">Sign up</NavLink>
                <span>|</span>
                <NavLink className="login" to="/login">Login</NavLink>
              </>
            )}
          </div>
        </ul>
      </nav>

      <Outlet/>
    </>
  );
};

export default Header;
