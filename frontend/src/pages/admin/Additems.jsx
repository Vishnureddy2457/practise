import React, { useState } from 'react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('addItems'); // State to manage active tab
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [productPrice, setProductPrice] = useState(25);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]); // State to store all products

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      productName,
      productDescription,
      productCategory,
      subCategory,
      productPrice,
      selectedSizes,
      isBestseller,
      images,
    };
    console.log('Product Data:', productData);

    // Add the new product to the products list
    setProducts([...products, productData]);

    // Reset the form fields
    setProductName('');
    setProductDescription('');
    setProductCategory('Men');
    setSubCategory('Topwear');
    setProductPrice(25);
    setSelectedSizes([]);
    setIsBestseller(false);
    setImages([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab('addItems')}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === 'addItems'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Add Items
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('listItems')}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === 'listItems'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              List Items
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === 'orders'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Orders
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {activeTab === 'addItems' && (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-8">Add Items</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  placeholder="Type here"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Description</label>
                <textarea
                  placeholder="Write content here"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows="3"
                  required
                />
              </div>

              {/* Product Category, Sub Category, and Price */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Category</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Sub Category</label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Price</label>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Product Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Sizes</label>
                <div className="mt-2 flex space-x-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeChange(size)}
                      className={`px-4 py-2 rounded-md ${
                        selectedSizes.includes(size)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              {/* Add to Bestseller */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Add to Bestseller</label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                ADD
              </button>
            </form>
          </div>
        )}

        {activeTab === 'listItems' && (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-8">List Items</h1>
            {products.length === 0 ? (
              <p className="text-center text-gray-500">No products added yet.</p>
            ) : (
              <div className="space-y-4">
                {products.map((product, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">{product.productName}</h2>
                    <p className="text-gray-600">{product.productDescription}</p>
                    <p className="text-gray-600">
                      <strong>Category:</strong> {product.productCategory} - {product.subCategory}
                    </p>
                    <p className="text-gray-600">
                      <strong>Price:</strong> ${product.productPrice}
                    </p>
                    <p className="text-gray-600">
                      <strong>Sizes:</strong> {product.selectedSizes.join(', ')}
                    </p>
                    <p className="text-gray-600">
                      <strong>Bestseller:</strong> {product.isBestseller ? 'Yes' : 'No'}
                    </p>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Images:</h3>
                      <div className="flex space-x-2 mt-2">
                        {product.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={URL.createObjectURL(image)}
                            alt={`Product ${index + 1} Image ${imgIndex + 1}`}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-8">Orders</h1>
            <p>List of orders will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;