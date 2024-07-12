import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import list from "../../public/list.json";
import Card from './card'; // Ensure that the component is correctly imported

function Burgermenu() {
  const filterData = list.filter((data) => data.category === 'starter');
  
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div>
        <h1 className='font-bold text-xl pb-2'>Starters of this evening</h1>
        <p>Our starters set the perfect tone for an unforgettable dining experience. Crafted with a blend of traditional and contemporary flavors</p>
      </div>
      <div className='pt-10'>
        <Slider {...settings}>
          {filterData.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Burgermenu;