import React from "react";
// import { Link } from 'react-router-dom';
import "./Banner.css";
import GetStarted from "./GetStarted";

const Banner = () => {
  return (
    <>
      <div className="banner-text">
        <h1>Unlimited movies, TV shows, and more</h1>
        <h3>Watch anywhere. Cancel anytime</h3>
        <h3>
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <div className="w-100">
          <form
            action="#"
            method="post"
            aria-label="Sign up or restart your membership with Netflix."
            className="w-100 justify-content-center m-auto transparent-bg "
          >
            <GetStarted />

            {/* <input
              type="text"
              name="email"
              placeholder="Email address"
              required
              w-100
            />

            <button type="button" name="submit" title="submit">
              <Link to="/signup" className=" btn btn-lg  text-white  ">
                <text>Get Started {">"} </text>
              </Link>
            </button> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Banner;
