// import { RouterProvider } from "react-router-dom";
// import router from "./Router";

import {
  createBrowserRouter,
  createRoutesFromElements,
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
import NotFound from "./pages/NotFound";
import YourComponent from "./components/crud/Test";
import ViewMovie from "./components/crud/ViewMovieList";




let apiURL = process.env.REACT_APP_BASE_URL_DEV;
if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}


function App() {


const [userData, setUserData] = useState(false);
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
        
        setUserData(data.auth);
        
        
      });
  }
}, []);

 console.log(`Is user logged in from App.js : ${userData}`)


 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/movielist" element={<ViewMovie />} />

      {userData ? (
        <>
          <Route path="/movie" element={<MovieComponent />} />
        </>
      ) : (
        <>
          <Route path="/movie" element={<Login />} />
          {/* <Navigate to="/login" replace /> */}
        </>
      )}

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
        <Route path="/search" element={<Login />} />
      )}

      <Route path="/*" element={<NotFound />} />
    </Route>
  )
);


  
  return <RouterProvider router={router} />;
}

export default App;
