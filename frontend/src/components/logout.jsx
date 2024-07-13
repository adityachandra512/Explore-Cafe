import React from "react";
import { userAuth } from "../context/AuthProvider";
import Login from "./login";
import toast from "react-hot-toast";

function logout() {
  const [authUser, setAuthUser] = userAuth();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("user");
      toast.success("Logout successfull");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Error:" + error.message);
      setTimeout(()=>{},3000);
    }
  };
  return (
    <div>
      <button
        className='"px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer'
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
}

export default logout;
