import React from "react";
import {Link} from "react-router-dom"
import Login from "./login";
import { useForm } from "react-hook-form"
function Signup() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = (data) => {
      console.log(data); // Logs form data when submitted
      // You can add further logic here, e.g., API calls for signup
    };
  
    return (
      <>
        <div className="flex h-screen items-center justify-center">
          <div className="w-[600px]">
            <div className="modal-box bg-white dark:bg-gray-800 p-8">
              <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                {/* Close button for the modal */}
                <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black dark:text-white">
                  ✕
                </Link>
                <h3 className="font-bold text-lg text-black dark:text-white">Signup</h3>
                {/* Name input */}
                <div className="mt-4 space-y-2">
                  <span className="text-black dark:text-white">Name</span>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("name", { required: true })}
                  />
                  <br />
                  {errors.name && <span className="text-red-500">Name is required</span>}
                </div>
                {/* Email input */}
                <div className="mt-4 space-y-2">
                  <span className="text-black dark:text-white">Email</span>
                  <br />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("email", { required: true })}
                  />
                  <br />
                  {errors.email && <span className="text-red-500">Email is required</span>}
                </div>
                {/* Password input */}
                <div className="mt-4 space-y-2">
                  <span className="text-black dark:text-white">Password</span>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("password", { required: true })}
                  />
                  <br />
                  {errors.password && <span className="text-red-500">Password is required</span>}
                </div>
                {/* Signup button and login link */}
                <div className="flex justify-around mt-4">
                  <button className="bg-yellow-500 text-dark rounded-md px-3 py-1 hover:bg-yellow-600 duration-200">
                    Signup
                  </button>
                  <p className="text-black dark:text-white">
                    Already have an account?{" "}
                    <button
                      className="underline text-blue-500 cursor-pointer"
                      onClick={() => document.getElementById("my_modal_3").showModal()}
                    >
                      Login
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Login modal */}
        <Login />
      </>
    );
  }
  
  export default Signup;