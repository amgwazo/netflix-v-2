 import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import feature1 from "../images/feature1.png";
import feature3 from "../images/feature3.png";
import feature4 from "../images/feature4.png";

const CarouselEnjoyTv = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <Image src={feature1} alt="first slide" />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={feature3} alt="second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={feature4} alt="third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselEnjoyTv;