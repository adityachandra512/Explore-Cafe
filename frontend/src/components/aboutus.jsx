import React from 'react';
import { motion } from 'framer-motion';
import profile from "../../public/image/profilepic.jpg";
import satyam from "../../public/image/satyam.jpg";
import avadhesh from "../../public/image/avadhesh.jpg";

const AboutUs = () => {
  // Animation configurations
  const animations = {
    fadeInUp: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    staggerChildren: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, staggerChildren: 0.2 }
    }
  };

  // Update the founders array with social media links
  const founders = [
      {
        name: "Aditya Chandra",
        role: "Founder & CEO",
        image: profile,
        description: "A visionary leader with a passion for culinary innovation, Aditya transforms dining experiences through creative entrepreneurship.",
        social: {
          linkedin: "https://linkedin.com/in/aditya-chandra",
          instagram: "https://instagram.com/aditya.chandra"
        }
      },
      {
        name: "Satyam Maurya",
        role: "Co-Founder & Head Chef",
        image: satyam,
        description: "A culinary maestro with 8 years of experience, crafting dishes that beautifully bridge traditional and contemporary cuisines.",
        social: {
          linkedin: "https://www.linkedin.com/in/satyam-maurya-643b48258/",
          instagram: "https://www.instagram.com/maurya_satyam_21/"
        }
      },
      {
        name: "Avadhesh Kumar",
        role: "Co-Founder & Operations Director",
        image: avadhesh ,
        description: "An expert in operational excellence, ensuring seamless experiences and setting new standards in customer service.",
        social: {
          linkedin: "https://www.linkedin.com/in/avadhesh-kumar-316875258/",
          instagram: "https://www.instagram.com/official_avadhesh_45/?__pwa=1"
        }
      }
  ];
  
  // Update the founder card rendering in the grid
  <div className="grid md:grid-cols-3 gap-8">
    {founders.map((founder, index) => (
      <motion.div
        key={founder.name}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        <div className="mb-6 overflow-hidden rounded-lg">
          <img 
            src={founder.image}
            alt={founder.name}
            className="w-full h-64 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{founder.name}</h3>
        <p className="text-yellow-600 dark:text-yellow-500 font-medium mb-4">{founder.role}</p>
        <p className="text-gray-600 dark:text-gray-400">{founder.description}</p>
        
        {/* Add Social Media Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a 
            href={founder.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a 
            href={founder.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 transition-colors"
            aria-label="Instagram Profile"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </motion.div>
    ))}
  </div>
  const globalLocations = [
    {
      city: 'Amsterdam',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop'
    },
    {
      city: 'Faridabad',
      image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=2070&auto=format&fit=crop'
    },
    {
      city: 'Mangalgiri',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900">
      {/* Hero Section with Enhanced Responsiveness */}
      <div className="relative h-[40vh] md:h-[50vh] bg-yellow-500 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          alt="Restaurant Hero"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1 
            {...animations.fadeInUp}
            className="text-4xl md:text-6xl font-bold text-white text-center"
          >
            Our Story
          </motion.h1>
        </div>
      </div>

      {/* Team Section with Improved Animations */}
      <motion.div 
        className="py-20 px-4 md:px-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            {...animations.fadeInUp}
          >
            <span className="text-yellow-600 dark:text-yellow-500 font-medium bg-yellow-50 dark:bg-gray-800 px-4 py-2 rounded-full inline-block mb-4">
              Meet Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              The Minds Behind Explorer Cafe
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              United by passion, we transform culinary dreams into extraordinary dining experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-64 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{founder.name}</h3>
                <p className="text-yellow-600 dark:text-yellow-500 font-medium mb-4">{founder.role}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{founder.description}</p>
                
                {/* Add Social Media Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a 
                    href={founder.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href={founder.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 transition-colors"
                    aria-label="Instagram Profile"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Journey Section with Enhanced Layout */}
      <motion.div 
        className="py-20 px-4 md:px-20 bg-gray-50 dark:bg-gray-800/50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <motion.div className="md:w-1/2" {...animations.fadeInUp}>
            <span className="text-yellow-600 dark:text-yellow-500 font-medium bg-yellow-50 dark:bg-gray-800 px-4 py-2 rounded-full inline-block mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              From Dream to Reality
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Born in 2016 in Faridabad, Explorer Cafe emerged from a bold vision. What began as an intimate cafe has blossomed into a culinary destination, celebrated for transformative dining experiences.
            </p>
            <div className="space-y-4">
              {[
                { value: "5+", label: "Years of Excellence", subtext: "Innovating since 2016" },
                { value: "50+", label: "Unique Dishes", subtext: "Crafted with creativity" }
              ].map(({ value, label, subtext }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                    {value}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://freshcup.com/wp-content/uploads/2016/06/FerrisCoffee_ConstructionPhase.jpg" 
              alt="Our Journey" 
              className="rounded-2xl shadow-2xl w-full hover:scale-[1.02] transition-transform duration-300" 
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Global Presence Section with Refined Design */}
      <motion.div 
        className="py-20 px-4 md:px-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <span className="text-yellow-600 dark:text-yellow-500 font-medium bg-yellow-50 dark:bg-gray-800 px-4 py-2 rounded-full inline-block mb-4">
            Global Presence
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Serving Across Borders
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Our commitment to culinary excellence knows no boundaries, bringing distinctive flavors to food lovers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {globalLocations.map(({ city, image }, index) => (
            <motion.div
              key={city}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={image}
                  alt={city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{city}</h3>
                <p className="text-gray-600 dark:text-gray-400">Discover our signature cuisine and warm hospitality</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;