import Banner from '../components/videos/Banner';
import './Videos.css';
import Row from '../components/videos/Row';



const Videos = () => {
  

  return (
    <>
      <div className="h-100 bg-black">
        {/* <div className="nav-bar d-flex flex-column bg-black  ">
          <Navbar />
         
        </div> */}
        <Banner />

        <Row title="Netflix Originals" fetchUrl isLargeRow />

        <Row title="Trending Now" fetchUrl />

        <Row title="Action movies" fetchUrl genre_id="28" />

        <Row title="Action movies" fetchUrl genre_id="" />

        <Row title="Comedy Movies" fetchUrl genre_id="35" />

        <Row title="Horror Movies" fetchUrl genre_id="27" />

        <Row title="Romance Movies" fetchUrl genre_id="10749" />

        <Row title="Documentaries" fetchUrl genre_id="99" />
      </div>
    </>
  );
}

export default Videos