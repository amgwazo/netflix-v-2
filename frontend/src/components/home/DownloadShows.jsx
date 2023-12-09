import React from 'react';
import Image from "react-bootstrap/Image";
import feature2 from "../../images/feature2.png";
import './DownloadShows.css';

const DownloadShows = () => {
  return (
     
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 download-your-shows">
            <h2>Download your shows to watch offline</h2>
            <p>
              Save your favorites easily and always have something to watch.
            </p>
          </div>

          <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 download-your-shows-img">
            <Image
              src={feature2}
              alt="feature 2"
            />
          </div>
        </div>
  );
}

export default DownloadShows