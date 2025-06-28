import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    material: "",
    color: "",
    size: "",
    stockQuantity: "",
    brand: "",
    weight: 0,
    dimensions: "",
    returnPolicy: "30 days return policy"
  });
  const [productImages, setProductImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProductImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    console.log("Product images:", productImages);
    alert("Product form submitted (check console for data)");
  };

  return (
    <div className="h-full-screen w-full bg-[#1e1e2f] min-h-screen flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="m-5 w-full max-w-4xl bg-white text-white rounded-2xl shadow-lg p-8"
      >
        <p className="font-bold text-3xl text-center text-blue-800 mb-6">
          Add New Product
        </p>
        <div className="bg-white p-5 rounded-xl shadow-md">
          {/* Product Details */}
          <div className="flex flex-col lg:flex-row gap-4 text-gray-700">
            <div className="w-full flex flex-col gap-4">
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <select
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Tiles">Tiles</option>
                <option value="Furniture">Furniture</option>
                <option value="Bathroom">Bathroom</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Lighting">Lighting</option>
                <option value="Decor">Decor</option>
              </select>

              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="subCategory"
                placeholder="Sub Category (e.g., Floor Tiles, Wall Tiles)"
                value={formData.subCategory}
                onChange={handleChange}
              />

              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                min={0}
                step="0.01"
                required
              />

       

              <textarea
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
                rows="3"
                name="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-4">
              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="material"
                placeholder="Material (e.g., Ceramic, Porcelain, Wood)"
                value={formData.material}
                onChange={handleChange}
              />

              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="color"
                placeholder="Color"
                value={formData.color}
                onChange={handleChange}
              />

              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="size"
                placeholder="Size/Dimensions (e.g., 12x12 inches)"
                value={formData.size}
                onChange={handleChange}
              />

              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="number"
                name="stockQuantity"
                placeholder="Stock Quantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                min={0}
                required
              />

              <input
                className="border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300"
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images (Multiple)
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              type="file"
              name="productImages"
              onChange={handleImageChange}
              multiple
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Upload high-quality images of the product
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-full mt-8 shadow-lg transition duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;