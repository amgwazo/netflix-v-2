import React , {useState, useEffect} from 'react'
import Navbar from "../components/Navbar";
 import "./Signup.css";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


let apiURL = process.env.REACT_APP_BASE_URL_DEV  + "/register";
//"http://localhost:3001/api";

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD + "/register";
  //"https://netflix-clone-opav.onrender.com/api";
}

console.log(apiURL);



const SignUp = () => {
// const [users, setUsers] = useState([]);
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

useEffect(() => {
  fetchUsers();
})

const fetchUsers = () =>{

  
  axios.get(apiURL).then((res) => {
  // axios.get("https://netflix-clone-opav.onrender.com/register").then((res) => {
    // axios.get('http://localhost:3001/register').then((res) =>{
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
}

const handleRegister = (event) => {
  event.preventDefault();

  axios.post(apiURL, {email, username, password})
  .then(( response) => {    
    alert('Registration Successful!');
    setEmail('');
    setPassword('');
    setUsername('');
    fetchUsers();
    navigate('/login');
      
  })
  .catch((error) => {
      if (error.response) {
        // Request made but the server responded with an error
        handleErrorResponse(error.response.data);
      } else if (error.request) {
        // Request made but no response is received from the server.
        alert("Fetch Data Error: " + error.request);
      } else {
        // Error occurred while setting up the request
        alert("Fetch Data Error: " + error.message);
      }
    });
};

const handleErrorResponse = (errorData) => {
  // Convert errorData to a string if it's not already
  const errorMessage =
    typeof errorData === "string" ? errorData : JSON.stringify(errorData);

  // Customize the error message based on the content
  if (
    errorMessage.includes(
      "E11000 duplicate key error collection: netflix.users index: username_1"
    )
  ) {
    alert("Username already exists. Please choose a different username.");
  } else {
    // Handle other types of errors or show a generic message
    alert("An error occurred during signup. Please try again.");
  }
};

  return (
    <>
      <div className="d-flex flex-column">
        <Navbar className="" />
        <hr />

        <div className="d-flex w-75 m-auto pt-3  justify-content-center ">
          <form
            action="submit"
            method="post"
            aria-label="Sign up or restart your membership with Netflix."
            className="d-flex flex-column w-50  justify-content-center p-5 rounded-3 "
            onSubmit={handleRegister}
          >
            <h3>Create a password to start your membership</h3>
            <h5 className="text-secondary">
              Just a few more steps and you're done! We hate paperwork, too.
            </h5>

            <input
              type="text"
              name="Email"
              placeholder="Email "
              className="p-2 mt-2"
              onChange={(e) => setEmail(e.target.value)}
            />
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
            <div className="d-flex flex mt-2 text-secondary">
              <Form.Check
                aria-label="option 1"
                className="ps-1 pe-1 me-2 border border-1 rounded-2 border-secondary"
              />
              Please do not email me Netflix special offers.
            </div>
            <Button type='submit' variant="danger" size="lg" className="form-buttons mt-2 ">
              Next
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp