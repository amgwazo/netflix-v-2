
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
// import Navbar from './components/Navbar';
import "./App.css";
import Faq from './pages/Faq';
import Videos from './pages/Videos';
// import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <div className="app">
      {/* <Navbar /> */}
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/videos" element={<Videos />} />
          {/* {isUserSignedIn && <Route path="/account" element={<Account />} />} */}
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
