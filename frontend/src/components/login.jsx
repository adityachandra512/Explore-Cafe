import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignupPage = location.pathname === "/signup";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (isSignupPage) {
        const res = await axios.post("http://localhost:4001/user/signup", {
          name: data.name,
          email: data.email,
          password: data.password,
        });
        if (res.data) {
          toast.success("Signup successful!");
          navigate("/");
        }
      } else {
        const res = await axios.post("http://localhost:4001/user/login", {
          email: data.email,
          password: data.password,
        });
        if (res.data) {
          toast.success("Login successful");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            // Check if the user is admin and redirect accordingly
            if (data.email === "aditya_chandra@srmap.edu.in") {
              navigate("/admin");
            } else {
              window.location.reload();
            }
          }, 1000);
        }
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  if (isSignupPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
            <p className="text-gray-600 dark:text-gray-300">Join our culinary community</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:text-white"
                {...register("name", { required: true })}
              />
              {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:text-white"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">Valid email is required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:text-white"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && <span className="text-red-500 text-sm mt-1">Password must be at least 6 characters</span>}
            </div>

            <div className="flex flex-col gap-4">
              <button type="submit" className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-300 font-medium">
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 font-medium"
              >
                Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-gray-800 p-6 max-w-md w-full">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="space-y-6">
            <button 
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" 
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sign in to your account</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:text-white"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:text-white"
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-red-500 text-sm mt-1">Password is required</span>}
            </div>

            <div className="space-y-4">
              <button type="submit" className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-300 font-medium">
                Sign In
              </button>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Not registered? <Link to="/signup" className="text-yellow-500 hover:text-yellow-600 font-medium">Create an account</Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
