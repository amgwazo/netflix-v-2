import React from "react";
import CarouselEnjoyTv from "../CarouselEnjoyTv";
import './EnjoyTv.css';

const EnjoyTv = () => {
  return (
    <div className="row">
      <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 m-5 enjoy-on-tv">
        <h2>Enjoy on your TV</h2>
        <p>
          Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
          players, and more.
        </p>
      </div>

      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
        <CarouselEnjoyTv />
      </div>
    </div>
  );
};

export default EnjoyTv;
