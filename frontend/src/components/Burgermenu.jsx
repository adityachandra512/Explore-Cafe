import React, { useEffect } from 'react';
import { useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import Card from './card'; // Ensure that the component is correctly imported

function Burgermenu() {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await axios.get("http://localhost:4001/menu");
        
        const data=res.data.filter((data) => data.category === 'starter');
         console.log(data);
        setMenu(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getMenu();
  }, []);

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
          {menu.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Burgermenu;