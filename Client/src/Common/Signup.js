import "../Styles/Login_SignUp.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        { username, password },
        { withCredentials: true }
      );
      alert("Signup successful");
      if (response.status === 201) {
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="body">
      <nav className="login-page-using-auto-layoyut-7">
        <div className="login-form-7">
          <div className="frame-27">
            <div className="text-55">Sign Up</div>
            <form onSubmit={handleSignup}> {/* Attach handleSignup to form's onSubmit */}
              <div className="username-field-3">
                <div className="text-56">USERNAME</div>
                <input
                  type="text"
                  className="username_input"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="password-field-3">
                <div className="text-56">PASSWORD</div>
                <input
                  type="password"
                  className="password_input"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="sign_in_button-14">
                <div className="text-57">Sign Up</div>
              </button>
            </form>
          </div>

          <div className="frame-28">
            <div className="welcome-to-login-17">
              <span className="welcome-to-login-18">Welcome To</span>
              <span className="welcome-to-login-19"> Sign Up </span>
            </div>
            <div className="text-60">Already have an account?</div>
            <button
              onClick={() => navigate("/login")}
              className="sign_up_button-6"
            >
              <div className="text-61">Log In</div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SignUpPage;
