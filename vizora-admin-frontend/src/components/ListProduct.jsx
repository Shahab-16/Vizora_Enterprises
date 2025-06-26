import React from 'react';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const ListProduct = () => {
  // Dummy product data with additional admin fields
  const products = [
    {
      id: 1,
      name: "Ceramic Floor Tiles",
      category: "Tiles",
      price: 24.99,
      cost: 15.50,
      stock: 125,
      status: "Active",
      image: "https://m.media-amazon.com/images/I/71q7+THYr5L._AC_UF1000,1000_QL80_.jpg",
      description: "Premium quality ceramic tiles for flooring",
      addedDate: "2023-05-15",
      lastUpdated: "2023-06-20"
    },
    {
      id: 2,
      name: "Wooden Coffee Table",
      category: "Furniture",
      price: 149.99,
      cost: 85.00,
      stock: 32,
      status: "Active",
      image: "https://www.ikea.com/us/en/images/products/vingo-coffee-table-black__1101517_pe866548_s5.jpg",
      description: "Modern wooden coffee table for living room",
      addedDate: "2023-04-10",
      lastUpdated: "2023-06-18"
    },
    {
      id: 3,
      name: "Porcelain Bathroom Tiles",
      category: "Bathroom",
      price: 32.50,
      cost: 22.00,
      stock: 0,
      status: "Out of Stock",
      image: "https://www.tiles-direct.com/wp-content/uploads/2022/02/porcelain-tiles-bathroom.jpg",
      description: "Water-resistant porcelain tiles for bathrooms",
      addedDate: "2023-06-05",
      lastUpdated: "2023-06-22"
    },
    {
      id: 4,
      name: "Kitchen Backsplash Tiles",
      category: "Kitchen",
      price: 18.75,
      cost: 12.50,
      stock: 87,
      status: "Active",
      image: "https://www.thespruce.com/thmb/5YJ8Q9k1z2Q3Q2Q2Q2Q2Q2Q2Q2Q=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/kitchen-backsplash-tile-ideas-1822134-hero-5b9a5b1d46e0fb0025c0b4a4.jpg",
      description: "Easy-to-clean kitchen backsplash tiles",
      addedDate: "2023-03-22",
      lastUpdated: "2023-06-15"
    },
    {
      id: 5,
      name: "Modern Pendant Light",
      category: "Lighting",
      price: 89.99,
      cost: 55.00,
      stock: 14,
      status: "Low Stock",
      image: "https://www.lumens.com/wp-content/uploads/2020/02/modern-pendant-lighting.jpg",
      description: "Contemporary pendant light for dining area",
      addedDate: "2023-05-30",
      lastUpdated: "2023-06-19"
    },
    {
      id: 6,
      name: "Decorative Wall Mirror",
      category: "Decor",
      price: 65.00,
      cost: 42.50,
      stock: 23,
      status: "Active",
      image: "https://www.urbanoutfitters.com/images/product/zoom/out-from-under-round-wall-mirror-00.jpeg",
      description: "Elegant round wall mirror for home decor",
      addedDate: "2023-06-12",
      lastUpdated: "2023-06-21"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Product Inventory</h1>
        <div className="flex space-x-4">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/Cost
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description.substring(0, 30)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">Cost: ${product.cost.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.stock} units</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      product.status === 'Out of Stock' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FiEye className="h-5 w-5" />
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <FiEdit className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;