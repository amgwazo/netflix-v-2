import React from 'react'
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <div className="d-flex justify-content-center">
      <input type="text" name="email" placeholder="Email address" required />
      {/* <Link to="/signup" className=" btn btn-lg nav-btn ">
              <text>Get Started </text>
            </Link> */}
      <button
        type="button"
        name="submit"
        title="submit"
        className=" btn-danger form-buttons"
      >
        <Link to="/signup" className=" btn btn-lg text-white  ">
          <span>Get Started {">"} </span>
        </Link>
      </button>
    </div>
  );
}

export default GetStarted;