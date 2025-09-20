import React from "react";
import Slider from "react-slick";
import Card from "./Card";

const breakpoint = {
  sm: 576,
  md: 768,
  lg: 992
};

export default function BestsellersSection({ data }) {
  const sliderSettings = {
    className: "bestsellers-carousel",
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: false,
    dots: false,
    responsive: [
      {
        breakpoint: breakpoint.lg,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: false
        }
      },
      {
        breakpoint: breakpoint.md,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="container my-5">
      <section className="text-center">
        <hr />
        <h1 className="mb-3">Bestsellers</h1>
        <div className="mb-4">
          <a href="#" className="btn btn-outline-primary me-2">For Him</a>
          <a href="#" className="btn btn-outline-primary">For Her</a>
        </div>
        <div className="slider-wrapper">
          <Slider {...sliderSettings}>
            {data?.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}
