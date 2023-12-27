// import { RouterProvider } from "react-router-dom";
// import router from "./Router";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MovieComponent from "./components/crud/MovieComponent";
import Videos from "./pages/Videos";
import Search from "./components/search/search";
import { useEffect, useState } from "react";


let apiURL = process.env.REACT_APP_BASE_URL_DEV;
if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}


function App() {



const [userData, setUserData] = useState("");
// let navigate = useNavigate();


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/movie" element={<MovieComponent />} />

      {userData ? (
        <>
          <Route path="/videos" element={<Videos />} />
        </>
      ) : (
        <>
          <Route path="/videos" element={<Login />} />
          {/* <Navigate to="/login" replace /> */}
        </>
      )}

      {userData ? (
        <>
          <Route path="/search" element={<Search />} />
        </>
      ) : (
        <Route path="/videos" element={<Login />} />
      )}
    </Route>
  )
);


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


  
  return <RouterProvider router={router} />;
}

export default App;
