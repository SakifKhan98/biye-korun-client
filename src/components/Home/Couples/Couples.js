import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CoupleCard from "./CoupleCard/CoupleCard";
import "./Couples.css";

const Couples = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="couple container mt-4">
      <h2 className="text-center brand-text mb-3">Lakhs Of Happy Couple</h2>
      <p className="text-center brand-text mb-3">Created By BiyeKorun</p>
      <div>
        <Carousel infinite={true} responsive={responsive}>
          <div>
            <CoupleCard></CoupleCard>
          </div>
          <div>
            <CoupleCard></CoupleCard>
          </div>
          <div>
            <CoupleCard></CoupleCard>
          </div>
          {/* <div>
            <CoupleCard></CoupleCard>
          </div> */}
          {/* <div>
            <CoupleCard></CoupleCard>
          </div>
          <div>
            <CoupleCard></CoupleCard>
          </div>
          <div>
            <CoupleCard></CoupleCard>
          </div> */}
        </Carousel>
      </div>
    </div>
  );
};

export default Couples;
