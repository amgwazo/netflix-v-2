
import {Routes, Route, Navigate , useNavigate } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
// import Navbar from './components/Navbar';
import "./App.css";
import Faq from './pages/Faq';
import Videos from './pages/Videos';
import { useEffect, useState } from 'react';
import Search from './components/search/search';
// import { Navbar } from 'react-bootstrap';



let apiURL = process.env.REACT_APP_BASE_URL_DEV;

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}






function App() {


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

  return (
    <div className="app">
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/videos" element={<Videos />} />
          <Route path='/search' element={<Search />} />
          

          {/* <Route
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
          /> */}

          {/* {userData ? (
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
          )} */}
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </div>
    </div>
  );
}


//   return (
//     <div className="app">
//       {/* <Navbar /> */}
//       <div>
//         {/* <Navbar /> */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           {userData ? (
//             <>
//               <Route path="/account" element={<Account />} />
//               <Route path="/videos" element={<Videos />} />
//             </>
//           ) : (
//             // Redirect to login page if not signed in
//             <>
//               <Navigate to="/login" />
//             </>
//           )}

//           {/* {isUserSignedIn && <Route path="/account" element={<Account />} />} */}
//           <Route path="/faq" element={<Faq />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

export default App;
