import React from 'react';
import profile from "../../public/image/profilepic.jpg"
const aboutus = () => {
  return (
    <div>
      {/* Section 1: About the Owner */}
      <div className="py-20 px-4 md:px-20 bg-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About the Owner</h2>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              Our owner, [Aditya Chandra], has a deep passion for culinary arts and has been in the restaurant industry for over 5 years...
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              With a vision to create a unique dining experience, [Aditya Chandra] established Explore cafe restaurant to bring joy to food lovers from all around the world...
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 md:ml-8">
            <img src={profile} alt="Restaurant" className="rounded-lg shadow-lg w-full" />
          </div>
        </div>
      </div>

      {/* Section 2: Establishment Details */}
      <div className="py-20 px-4 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-6 md:mt-0 md:mr-6 order-2 md:order-1">
            <img src="https://freshcup.com/wp-content/uploads/2016/06/FerrisCoffee_ConstructionPhase.jpg" alt="Under Construction Cafe" className="rounded-lg shadow-lg w-full" />
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              Our Cafe was established in [2016] in [Faridabad]. The journey began with a dream to create a cozy spot for food enthusiasts...
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              Over the years, we have evolved from a small cafe under construction to a beloved dining destination in the community...
            </p>
          </div>
        </div>
      </div>
      
      {/*  Sections3  can go here */}
      <div className="py-20 px-4 md:px-20 bg-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Branches</h2>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              We have expanded our presence globally with branches in multiple countries, offering our unique culinary experience to food lovers worldwide...
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              Our branches are located in [amstradam], each maintaining the quality and ambiance that our restaurant is known for...
            </p>
            <p className="text-lg md:text-xl text-gray-700">
              Join us at any of our branches and enjoy a memorable dining experience...
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
            <img src="https://th.bing.com/th/id/OIP.9XgErbzeOGjMUaPEUdPHXQHaE8?rs=1&pid=ImgDetMain" alt="Branches" className="rounded-lg shadow-lg w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutus;
