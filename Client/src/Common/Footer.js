import React from "react";
import "../Styles/Footer.css";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/images/Logo.png" alt="Campus Sphere" />
          </div>

          <div className="footer-sections">
            <div className="footer-column">
              <h4>About Us</h4>
              <ul>
                <li>
                  <a href="/">Company</a>
                </li>
                <li>
                  <a href="/">Blog</a>
                </li>
                <li>
                  <a href="/">Teachers</a>
                </li>
                <li>
                  <a href="/">Press</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Learning</h4>
              <ul>
                <li>
                  <a href="/">e-Portal</a>
                </li>
                <li>
                  <a href="/">Reports</a>
                </li>
                <li>
                  <a href="/">Policies</a>
                </li>
                <li>
                  <a href="/">Terms</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="/">Email</a>
                </li>
                <li>
                  <a href="/">LinkedIn</a>
                </li>
                <li>
                  <a href="/">Instagram</a>
                </li>
                <li>
                  <a href="/">Twitter</a>
                </li>
              </ul>
            </div>

            <div className="footer-newsletter">
              <h4>Join our newsletter</h4>
              <div className="newsletter-form">
                <input type="email" placeholder="Email Address" />
                <button type="submit">SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
