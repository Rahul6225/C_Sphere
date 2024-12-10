import '../Styles/Login_SignUp.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/login',
        { username, password },
        { withCredentials: true }
      );

      console.log('Response status code:', response.status);

      if (response.status === 200) {
        const userResponse = await axios.get("http://localhost:4000/api/auth/verify", {
          withCredentials: true,
        });
  
        const user = userResponse.data;
        if (user.username === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error('Error:', err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="body">
      <nav className="login-page-using-auto-layoyut-7">
        <div className="login-form-7">
          <div className="frame-27">
            <div className="text-55">Log In</div>
            <form onSubmit={handleLogin}> {/* Attach handleLogin here */}
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
                <div className="text-57">Log in</div>
              </button>
              <div className="signin_sols-8">
                <div className="remember_me-8">
                  <input type="checkbox" id="checkbox" name="rememberMe" className="checkbox" />
                  <div className="text-58">Remember Me</div>
                </div>
                <div className="text-59">Forgot Password?</div>
              </div>
            </form>
          </div>
          <div className="frame-28">
            <div className="welcome-to-login-17">
              <span className="welcome-to-login-18">Welcome To</span>
              <span className="welcome-to-login-19"> Log In </span>
            </div>
            <div className="text-60">Don't have an account?</div>
            <button
              onClick={() => (window.location.href = '/signup')}
              className="sign_up_button-6"
            >
              <div className="text-61">Sign Up</div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Login;
