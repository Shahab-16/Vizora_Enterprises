import React, { useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";

const ListProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: 1,
      name: "Ceramic Floor Tiles",
      category: "Tiles",
      price: 24.99,
      cost: 15.5,
      stock: 125,
      status: "Active",
      image:
        "https://m.media-amazon.com/images/I/71q7+THYr5L._AC_UF1000,1000_QL80_.jpg",
      description: "Premium quality ceramic tiles for flooring",
      addedDate: "2023-05-15",
      lastUpdated: "2023-06-20",
    },
    {
      id: 2,
      name: "Wooden Coffee Table",
      category: "Furniture",
      price: 149.99,
      cost: 85.0,
      stock: 32,
      status: "Active",
      image:
        "https://www.ikea.com/us/en/images/products/vingo-coffee-table-black__1101517_pe866548_s5.jpg",
      description: "Modern wooden coffee table for living room",
      addedDate: "2023-04-10",
      lastUpdated: "2023-06-18",
    },
    {
      id: 3,
      name: "Porcelain Bathroom Tiles",
      category: "Bathroom",
      price: 32.5,
      cost: 22.0,
      stock: 0,
      status: "Out of Stock",
      image:
        "https://www.tiles-direct.com/wp-content/uploads/2022/02/porcelain-tiles-bathroom.jpg",
      description: "Water-resistant porcelain tiles for bathrooms",
      addedDate: "2023-06-05",
      lastUpdated: "2023-06-22",
    },
    {
      id: 4,
      name: "Kitchen Backsplash Tiles",
      category: "Kitchen",
      price: 18.75,
      cost: 12.5,
      stock: 87,
      status: "Active",
      image:
        "https://www.thespruce.com/thmb/5YJ8Q9k1z2Q3Q2Q2Q2Q2Q2Q2Q=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/kitchen-backsplash-tile-ideas-1822134-hero-5b9a5b1d46e0fb0025c0b4a4.jpg",
      description: "Easy-to-clean kitchen backsplash tiles",
      addedDate: "2023-03-22",
      lastUpdated: "2023-06-15",
    },
    {
      id: 5,
      name: "Modern Pendant Light",
      category: "Lighting",
      price: 89.99,
      cost: 55.0,
      stock: 14,
      status: "Low Stock",
      image:
        "https://www.lumens.com/wp-content/uploads/2020/02/modern-pendant-lighting.jpg",
      description: "Contemporary pendant light for dining area",
      addedDate: "2023-05-30",
      lastUpdated: "2023-06-19",
    },
    {
      id: 6,
      name: "Decorative Wall Mirror",
      category: "Decor",
      price: 65.0,
      cost: 42.5,
      stock: 23,
      status: "Active",
      image:
        "https://www.urbanoutfitters.com/images/product/zoom/out-from-under-round-wall-mirror-00.jpeg",
      description: "Elegant round wall mirror for home decor",
      addedDate: "2023-06-12",
      lastUpdated: "2023-06-21",
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex  flex-col max-w-full mx-auto gap-8 p-4 sm:p-8 bg-[#1e1e2f] min-h-screen">
      {/* Search Bar */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <AiOutlineSearch className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            className="p-2 pl-10 w-full rounded-lg border border-gray-700 bg-[#2c2c3c] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Header */}
      <div className="hidden sm:grid sm:grid-cols-6 gap-6 text-sm font-semibold text-gray-300 border-b border-gray-700 pb-3">
        <p className="text-center">Image</p>
        <p className="text-left">Name</p>
        <p className="text-left">Category</p>
        <p className="text-left">Price / Cost</p>
        <p className="text-center">Status</p>
        <p className="text-center">Actions</p>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-6 items-center bg-[#2a2a3b] bg-opacity-90 text-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="text-center ml-[25%] sm:ml-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[60px] h-[60px] rounded-md object-cover mx-auto"
                />
              </div>

              {/* Name & Description */}
              <div className="text-left">
                <p className="font-medium text-white">{product.name}</p>
                <p className="text-sm text-gray-400">{product.description.substring(0, 30)}...</p>
              </div>

              {/* Category */}
              <p className="hidden sm:block text-left text-gray-400">{product.category}</p>

              {/* Price / Cost */}
              <div className="hidden sm:block text-left">
                <p className="text-white">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Cost: ${product.cost.toFixed(2)}</p>
              </div>

              {/* Status */}
              <p
                className={`text-center font-semibold ${
                  product.status === "Active"
                    ? "text-green-400"
                    : product.status === "Out of Stock"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {product.status}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3">
                <button className="text-purple-400 hover:text-purple-300 transition">
                  <FiEye size={20} />
                </button>
                <button className="text-indigo-400 hover:text-indigo-300 transition">
                  <FiEdit size={20} />
                </button>
                <button className="text-red-400 hover:text-red-300 transition">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
