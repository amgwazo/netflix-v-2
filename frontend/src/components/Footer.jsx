import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer>
        <span id="contact-link">
          <a href="#" id="contact-link-a">
            Questions? Contact us.
          </a>
        </span>
        <span></span>
        <span></span>

        <span>
          <a href="#">FAQ</a>
        </span>
        <span>
          <a href="#">Help Center</a>
        </span>
        <span>
          <a href="#">Account</a>
        </span>

        <span>
          <a href="#">Media Center</a>
        </span>
        <span>
          <a href="#">Investor Relations</a>
        </span>
        <span>
          <a href="#">Jobs</a>
        </span>

        <span>
          <a href="#">Ways to Watch</a>
        </span>
        <span>
          <a href="#">Terms of Use</a>
        </span>
        <span>
          <a href="#">Privacy</a>
        </span>

        <span>
          <a href="#">Cookie Preferences</a>
        </span>
        <span>
          <a href="#">Corporate Information</a>
        </span>
        <span>
          <a href="#">Contact Us</a>
        </span>

        <span>
          <a href="#">Speed Test</a>
        </span>
        <span>
          <a href="#">Legal Notices</a>
        </span>
        <span>
          <a href="#">Only on Netflix</a>
        </span>

        <div>
          <select name="languages" id="languages" title="languages">
            <option value="en-ZM">English</option>
          </select>
          <span>Netflix Zambia</span>
        </div>
      </footer>
    </>
  );
}

export default Footer