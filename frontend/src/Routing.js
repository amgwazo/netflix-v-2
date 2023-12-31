import { Route, Routes } from "react-router-dom";
import Search from "./components/search/search";
import Videos from "./pages/Videos";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MovieComponent from "./components/crud/MovieComponent";

let apiURL = process.env.REACT_APP_BASE_URL_DEV;
if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}

const Routing = () => {
  const [userData, setUserData] = useState("");
  // let navigate = useNavigate();

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
          // console.log(data);
          setUserData(data);
        });
    }
  }, []);

  console.log(userData);


  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movie" element={<MovieComponent />} />

        {userData ? (
          <>
            <Route path="/videos" element={<Videos />} />
            <Route path="/search" element={<Search />} />
          </>
        ) : (
          <>
            
          </>
        )}
      </Routes>
    </>
  );
};

export default Routing;

/* <Route
            path="/account"
            element={
              userData ? (
                <Navigate to="/account" />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />

          <Route
            path="/videos"
            element={
              userData ? (
                <Videos /> 
              ) : (
                <Login />
              )
            }
          /> */

/* {userData ? (
            <>
              <Route path="/account" element={<Account />} />
              <Route path="/videos" element={<Videos />} />
            </>
          ) : (
            // Redirect to login page if not signed in
            <>
              <Route path="/account" element={<Login />} />
              <Route path="/videos" element={<Login />} />
            </>
          )} */
