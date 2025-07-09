import React from 'react';
import pendant from "../assets/images/pendant.webp"

const CartItems = ({ products, setProducts }) => {
  const cartItems = products.filter(product => product.inCart);

  const removeFromCart = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, inCart: false } : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-4 mb-4 rounded-full bg-gray-800/50 border border-gray-700">
            <svg className="w-12 h-12 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-300">Your cart is empty</h3>
          <p className="text-gray-500">Add some products to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {cartItems.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-purple-500/30 shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 ">
                <img
                  src={pendant || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-purple-300 font-bold text-lg mb-4">${product.price.toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all shadow hover:shadow-red-500/30 w-full"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
