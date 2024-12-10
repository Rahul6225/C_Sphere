import LoginPage from "./Common/Login.js";
import SignupPage from "./Common/Signup.js";
import ProtectedRoute from "./Common/ProtectedRoute.js";

import Navigation from "./Common/Navigation.js";
import Home from "./Student/Home.js";
import StudentInfo from "./Student/StudentInfo.js";
import Register from "./Student/Register.js";
import Medical from "./Student/Medical.js";
import Attendance from "./Student/Attendance.js";
import Performance from "./Student/Performance.js";
import Contact from "./Student/Performance.js";

import AdminAttendance from "./Admin/Attendance.js";
import AdminStudentInfo from "./Admin/StudentInfo.js";

import EditProfileImage from "./Student/EditProfileImage.js";
import UpdateProfile from "./Student/UpdateProfile.js";
import Performance_Admin from "./Admin/Performance-admin.js";
import "./App.css";
import PaymentPage from "./Common/PaymentPage";

import QuizApp_1 from "./Student/QuizApp-1.js";
import QuizApp_2 from "./Student/QuizApp-2.js";
import QuizApp_3 from "./Student/QuizApp-3.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Router just renders the component according to the navigation links set through NavLinks
import { useEffect } from "react";
import ReactGA from "react-ga4";
const TraclID = "G-PMB6L869LE";
ReactGA.initialize(TraclID);
function App() {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });
    ReactGA.send({
      hitType: "pageview",
      page: "/contact",
      title: "Contact page viewed ",
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/register" element={<Register />} />
        <Route
          path="/quiz-Web_dev"
          element={
            <ProtectedRoute>
              <QuizApp_1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-ML"
          element={
            <ProtectedRoute>
              <QuizApp_2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-Cpp"
          element={
            <ProtectedRoute>
              <QuizApp_3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-medical"
          element={
            <ProtectedRoute>
              <Medical />
            </ProtectedRoute>
          }
        />
        <Route path="/edit-profile" element={<EditProfileImage />} />
        <Route path="/update-profile" element={<UpdateProfile />} />

        {/*Student Routes */}

        <Route element={<Navigation />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route path="/performance" element={<Performance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<PaymentPage />}></Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<Home />} />
          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute>
                <AdminAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/student"
            element={
              <ProtectedRoute>
                <AdminStudentInfo />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/performance" element={<Performance_Admin />} />
          <Route path="/admin/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
