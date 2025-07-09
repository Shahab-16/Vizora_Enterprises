import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from "../../assets/asset";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [showBackground, setShowBackground] = useState(window.innerWidth > 1140);
  
  const handleSelect = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="flex gap-12 items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Image section (hidden on smaller screens) */}
      <div className="hidden xl:flex w-1/2 h-full items-center justify-center">
        <img className="w-5/6 mb-[13%] object-contain" src={images.house_login} alt="Login" />
      </div>

      {/* Role Selection Box */}
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl text-center space-y-8 w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-purple-400">Login As</h1>
        <div className="space-y-4">
          <button
            onClick={() => handleSelect('user')}
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition"
          >
            User
          </button>
          <button
            onClick={() => handleSelect('admin')}
            className="w-full px-6 py-3 bg-white hover:bg-gray-200 text-purple-700 font-semibold rounded-xl transition"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
