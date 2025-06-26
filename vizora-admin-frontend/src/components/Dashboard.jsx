import React from "react";
import { FaCouch, FaThLarge, FaEye } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-purple-700 animate-fade-in">
          Welcome to <span className="text-black">Vizora's Design Studio</span>
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Visualize your space with furniture & tile combinations in 3D
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Furniture Designs</h2>
              <p className="text-3xl font-bold text-purple-600 mt-2">35+</p>
            </div>
            <FaCouch className="text-purple-600 text-4xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Tile Layouts</h2>
              <p className="text-3xl font-bold text-indigo-500 mt-2">20+</p>
            </div>
            <FaThLarge className="text-indigo-500 text-4xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">3D Visualizations</h2>
              <p className="text-3xl font-bold text-green-500 mt-2">150+</p>
            </div>
            <FaEye className="text-green-500 text-4xl" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-6 rounded-xl font-semibold shadow transition">
          Launch 3D Visualizer
        </button>
        <button className="bg-white border border-purple-700 text-purple-700 py-3 px-6 rounded-xl font-semibold hover:bg-purple-50 transition">
          Upload Your Room Layout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
