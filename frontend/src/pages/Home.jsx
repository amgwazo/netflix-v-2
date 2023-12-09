import React from "react";
import "./Home.css";
import Banner from "../components/home/Banner";
import EnjoyTv from "../components/home/EnjoyTv";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DownloadShows from "../components/home/DownloadShows";
import Kids from "../components/home/Kids";
import FaqsAccordion from "../components/home/FaqsAccordion";
import GetStarted from "../components/home/GetStarted";

const Home = () => {
  return (
    <div className="homepage">
      <div className="header d-flex flex-column pt-5">
        <Navbar />
        <Banner />
      </div>
      {/* Enjoy your tv   */}
      <section className="bg-black">
        <EnjoyTv className="enjoytv" />
      </section>

      {/*  Download your TV Shows Section */}
      <section className="bg-black ps-5">
        <DownloadShows />
      </section>

      {/*  Watch Everywhere Section */}

      <section className="bg-black ps-5">
        <div className="row">
          <div className="col-7 watch-everywhere">
            <h2>Watch</h2>
            <h2>everywhere</h2>
            <p>
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
        </div>
      </section>

      {/* Kid's Section */}

      <section className="bg-black">
        <Kids />
      </section>

      {/*  FAQ Section */}

      <section className="bg-black pt-3 pb-3 ps-5">
        <FaqsAccordion />

        <div className="col-12">
          <div className="banner-text get-started">
            <h4>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h4>
            <div className="w-100">
              <form
                action="#"
                method="post"
                aria-label="Sign up or restart your membership with Netflix."
                className="transparent-bg w-100"
              >
                <GetStarted />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/*  Footer */}
      <div className="bg-black mt-2 pt-5 ">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
