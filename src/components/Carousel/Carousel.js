import React, { useEffect } from "react";
import Card from "../Cards/Card";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./customStyle.css";

const Carousel = ({ data }) => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };
  const items = data?.map((item) => {
    return <Card key={item.id} data={item} />;
  });

  // const initialData = [
  //   <Card />,
  //   <Card />,
  //   <Card />,
  //   <Card />,
  //   <Card />,
  //   <Card />,
  //   <Card />,
  //   <Card />,
  //   <Card />,
  //   <Card />,
  // ];

  return (
    <AliceCarousel mouseTracking items={items || []} responsive={responsive} />
  );
};

export default Carousel;
