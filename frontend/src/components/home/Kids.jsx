import React from 'react'
import { Image } from 'react-bootstrap';
import feature4 from '../../images/feature4.png';

const Kids = () => {
  return (
    <div className="row ps-5">
      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-5 kids-profile">
        <h2 className='mt-5'>Create profiles for kids</h2>
        <p>
          Send kids on adventures with their favorite characters in a space made
          just for them—free with your membership.
        </p>
      </div>

      <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 kids-profile-img">
        <Image src={feature4} alt="feature-4" />
      </div>
    </div>

  );
}

export default Kids