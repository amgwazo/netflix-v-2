import { Link } from "react-router-dom";

const NotFound = () => {
  
  return (
    <>
      <div className="background-image d-flex flex-column">
        {/* body / form */}
        <div className="d-flex w-75 m-auto mt-5 pt-5 pb-5 mb-5 justify-content-center  ">
          <form
            action="submit"
            method="post"
            aria-label="Login"
            className="d-flex flex-column w-50  justify-content-center p-5 my-5 rounded-3 opacity-75 black-bg "
          >
            <h3 className="text-white mt-5">Page Not Found</h3>

            <div className="d-flex flex mt-3  text-white">
              <span>
                Sorry, the page you are looking for is not currently available. Please click
                <Link to="" className="ms-1">
                  here
                </Link> to report a broken link.
              </span>
            </div>
          </form>
        </div>

        {/*  Footer */}
        {/* <div className="bg-black mt-2 pt-5 opacity-75 text-secondary">
          <Footer />
        </div> */}
      </div>
    </>
  );
};

export default NotFound;
