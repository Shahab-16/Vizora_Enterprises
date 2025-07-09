import React, { useState } from "react";
import { FaCouch, FaThLarge, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const Dashboard = () => {
  const navigate=useNavigate();
  const purchases = [
    {
      id: 1,
      name: "Modern Sofa",
      category: "Furniture",
      price: 1200,
      quantity: 1,
      date: "2025-06-25",
      icon: <FaCouch className="text-xl text-purple-400" />,
    },
    {
      id: 2,
      name: "Marble Floor Tile",
      category: "Tile",
      price: 500,
      quantity: 20,
      date: "2025-06-20",
      icon: <FaThLarge className="text-xl text-purple-400" />,
    },
    {
      id: 3,
      name: "Ceramic Tile",
      category: "Tile",
      price: 450,
      quantity: 15,
      date: "2025-06-18",
      icon: <FaThLarge className="text-xl text-purple-400" />,
    },
    {
      id: 4,
      name: "Wooden Coffee Table",
      category: "Furniture",
      price: 700,
      quantity: 1,
      date: "2025-06-15",
      icon: <FaCouch className="text-xl text-purple-400" />,
    },
  ];

  const [name, setName] = useState("");

  const filteredProduct = purchases.filter((prod) =>
    prod.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex justify-center text-purple-400">
        User Dashboard
      </h1>
      <button onClick={()=>navigate("/dashboard/cartItems")} className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-4 py-2 rounded-xl shadow-md hover:from-purple-600 hover:to-indigo-600 hover:shadow-purple-500/30 transition-all duration-300 absolute top-0 right-0 mr-[5%] mt-[20px]">
        <FaShoppingCart size={20} className="text-white" />
        My Cart
      </button>
      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search your product"
          className="p-3 w-full max-w-md rounded-lg placeholder-gray-700   bg-gray-500 outline-none"
        />
      </div>

      {/* User Info Card */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 flex flex-col sm:flex-row items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className="rounded-full w-20 h-20 border-4 border-purple-500"
          />
          <div>
            <h2 className="text-xl font-semibold">Arsalan Ahmed</h2>
            <p className="text-gray-400">arsalan@example.com</p>
            <p className="text-gray-400">Bangalore, India</p>
          </div>
        </div>
      </div>

      {/* Purchase History Table */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">
          Purchase History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Product</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProduct.length > 0 ? (
                filteredProduct.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-700 transition-all"
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 flex items-center gap-2">
                      {item.icon} {item.name}
                    </td>
                    <td className="py-2 px-4">{item.category}</td>
                    <td className="py-2 px-4">₹{item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">{item.date}</td>
                    <td className="py-2 px-4">
                      <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm flex items-center gap-1">
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="py-4 text-center text-gray-400 italic"
                  >
                    No matching products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
