import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png';
import Image from "react-bootstrap/Image";
import { Nav } from 'react-bootstrap';
import searchImage from '../images/search.png';


let apiURL = process.env.REACT_APP_BASE_URL_DEV;

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}

const Navbar = () => {
const [userData, setUserData] = useState("");
let navigate = useNavigate();


  const handleSignOut = useCallback(async () => {
    sessionStorage.removeItem("ltk");
    sessionStorage.removeItem("userInfo");
    setUserData("");
    navigate("/login");
  }, []);

useEffect(() => {
  if (sessionStorage.getItem("ltk") != null) {
    fetch(`${apiURL}/userinfo`, {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("ltk"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
        if(data.auth === false) {
          handleSignOut();
        }else

        if(sessionStorage.getItem("ltk") == null) {
          handleSignOut();
        }
      });
  }
}, [handleSignOut]);


  return (
    // <Nav className="nav d-flex justify-content-between ">
    <Nav className="nav-main ">
      <div className="nav-left">
        <Link to="/videos">
          <Image
            className="nav-netflix-logo ms-5 mt-3 mb-0 pb-0"
            src={logo}
            alt="Netflix logo"
          />
        </Link>
        {userData ? (
          <div className="protected-links d-flex nav-buttons ms-5">
            <Link to="/" className="text-danger nav-button m-2">
              <li> Home</li>
            </Link>
            <Link to="/videos" className="text-danger nav-button  m-2">
              <li> TV Shows</li>
            </Link>
            
            {userData.user.role === "admin" && (
              <Link to="/admin" className="text-danger nav-button m-2">
                <li>Admin Panel</li>
              </Link>
            )}
          </div>
        ) : null}
      </div>

      <ul className="nav-right me-5 mt-3 mb-0 pb-2">
        {userData ? (
          <>
            <Link to="/search" className="image-button">
              <img src={searchImage} alt="Search" class="search-img" />
            </Link>

            <Link
              to="/account"
              className=" btn btn-sm  btn-danger form-buttons m-2"
            >
              <li> Account</li>
            </Link>

            <Link
              to=""
              className=" btn btn-sm  btn-danger form-buttons m-2"
              onClick={handleSignOut}
            >
              <li> Sign Out</li>
            </Link>
            {/* <li>
              <Button  className='btn btn-sm' onClick={handleSignOut}>Sign Out</Button>
            </li> */}
          </>
        ) : (
          <>
            <Link
              to="/login"
              className=" btn btn-sm  btn-danger form-buttons m-2"
            >
              <li> Sign In</li>
            </Link>
            {/* <Link to="/signup" className="btn btn-sm btn-danger form-buttons m-2">
            <li>Get Started</li>
          </Link> */}
          </>
        )}
      </ul>
    </Nav>
  );
}

export default Navbar