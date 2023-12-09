import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Button, Form, Nav } from "react-bootstrap";
import "../components/Navbar.css";
import logo from "../images/logo.png";
import Image from "react-bootstrap/Image";
import "./Login.css";
import Footer from "../components/Footer";

let apiURL = process.env.REACT_APP_BASE_URL_DEV;
//"http://localhost:3001/api";

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
  //"https://netflix-clone-opav.onrender.com/api";
}

// console.log(apiURL);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const email = '';
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = () => {
    axios
      .get(apiURL + "/register")
      .then((res) => {
        console.log(res.data);
        // setUsers(res.data);
      })
      .catch((error) => {
        if (error.response) {
          // Request made but the server responded with an error
          alert("Fetch Data Error: " + error.response.data);
        } else if (error.request) {
          // Request made but no response is received from the server.
          alert("No Response Error: " + error.message);
        } else {
          // Error occurred while setting up the request
          alert("Fetch Data Error: " + error.message);
        }
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(apiURL + "/login", {
        username,
        password,
      });

      const token = response.data.token;

      // alert("Login Successful.");

      // alert(`${JSON.stringify(token)}`);
      setPassword("");
      setUsername("");
      fetchUsers();
      // localStorage.setItem("token", token);
      sessionStorage.setItem("ltk", token);
      // window.location.reload();

      
      navigate("/");
      // navigate("/videos");
      // window.location.reload();
    } catch (error) {
      alert(`${JSON.stringify(error.response.data.error)}`);
    }
  };

  return (
    <>
      <div className="background-image d-flex flex-column">
        {/*Navbar */}
        <Nav className="d-flex justify-content-between ">
          <Link to="/">
            <Image
              className="nav-netflix-logo m-5"
              src={logo}
              alt="Netflix logo"
            />
          </Link>
        </Nav>

        {/* body / form */}
        <div className="d-flex w-75 m-auto pt-3 pb-5 mb-5 justify-content-center  ">
          <form
            action="submit"
            method="post"
            aria-label="Login"
            className="d-flex flex-column w-50  justify-content-center p-5 rounded-3 opacity-75 black-bg "
            onSubmit={handleLogin}
          >
            <h3 className="text-white">Login</h3>

            <input
              type="text"
              name="Username"
              placeholder="Username "
              className="p-2 mt-2"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              name="Password"
              placeholder="Add a password"
              className="p-2 mt-2"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="danger"
              size="lg"
              className="form-buttons mt-5 "
            >
              Login
            </Button>

            <div className="d-flex flex mt-2 text-white">
              <Form.Check aria-label="option 1" className="me-2" />
              <span className="me-5">Remember me</span>
              <Link to="/faq" className="nav text-white float-end ms-5">
                Need Help?
              </Link>
            </div>

            <div className="d-flex flex mt-5  text-white">
              <span className="mt-2 me-2">New to Netflix?</span>
              <Link to="/signup" className="text-white mt-2 ">
                Sign up now.
              </Link>
            </div>
            <div className="d-flex flex mt-3  text-white">
              <span>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.
                <Link to="" className="ms-2">
                  Learn more
                </Link>
              </span>
            </div>
          </form>
        </div>

        {/*  Footer */}
        <div className="bg-black mt-2 pt-5 opacity-75 text-secondary">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Login;
