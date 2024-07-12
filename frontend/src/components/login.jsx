import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Logs form data when submitted
    // You can add further logic here, e.g., API calls for authentication
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-gray-800">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* Close button for the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black dark:text-white">
              ✕
            </button>
          <h3 className="font-bold text-lg text-black dark:text-white">Login</h3>
          {/* Email input */}
          <div className="mt-4 space-y-2">
            <span className="text-black dark:text-white">Email</span>
            <br />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-80 px-3 py-1 border rounded-md outline-none text-black dark:text-white"
              {...register("email", { required: true })} // Register email field with required validation
            />
            <br />
            {errors.email && <span className="text-red-500">Email is required</span>} {/* Display error message if email is not entered */}
          </div>
          {/* Password input */}
          <div className="mt-4 space-y-2">
            <span className="text-black dark:text-white">Password</span>
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-80 px-3 py-1 border rounded-md outline-none text-black dark:text-white"
              {...register("password", { required: true })} // Register password field with required validation
            />
            <br />
            {errors.password && <span className="text-red-500">Password is required</span>} {/* Display error message if password is not entered */}
          </div>
          {/* Login button and signup link */}
          <div className="flex justify-around mt-4">
            <button className="bg-yellow-500 text-dark rounded-md px-3 py-1 hover:bg-yellow-600 duration-200">Login</button>
            <p className="text-black dark:text-white">
              Not registered? <Link to="/signup" className="underline text-blue-500 cursor-pointer">Sign up</Link>
            </p>
          </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
