import React from "react";
import { Link } from "react-router-dom";
import contactGif from './hp.gif'; // Adjust the path based on your file structure

function ContactForm() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl p-8 space-x-8 bg-white rounded-lg shadow-lg relative"> {/* Added relative positioning */}
        <h2 className="text-2xl font-bold text-gray-800 hover:text-yellow-600">Contact Us</h2>
        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 text-black dark:text-white">
          ✕
        </Link>
        <form className="w-1/2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-3 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition duration-200 ease-in-out"
          >
            Send Message
          </button>
        </form>
        <div className="w-1/2 flex justify-center items-center">
          <img src={contactGif} alt="Contact GIF" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
