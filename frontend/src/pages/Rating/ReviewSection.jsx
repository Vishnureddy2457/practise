import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewSection = ({ reviews, onSubmitReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    reviewer: '',
    role: '', // Will be either 'Renter' or 'Lender'
    product: {
      name: '',
      image: null, // Removed `id` from the product object
    },
  });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewReview((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        image: file,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !newReview.rating ||
      !newReview.comment.trim() ||
      !newReview.reviewer.trim() ||
      !newReview.role ||
      !newReview.product.name.trim() ||
      !newReview.product.image
    ) {
      toast.error('Please fill in all required fields.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Convert the uploaded image file to a URL for display
    const imageUrl = URL.createObjectURL(newReview.product.image);

    // Prepare the review object
    const reviewToSubmit = {
      ...newReview,
      product: {
        ...newReview.product,
        image: imageUrl,
      },
      date: new Date().toISOString(),
    };

    // Submit the review
    if (typeof onSubmitReview === 'function') {
      onSubmitReview(reviewToSubmit);
    } else {
      console.error('onSubmitReview is not a valid function.');
    }

    // Reset the form
    setNewReview({
      rating: 0,
      comment: '',
      reviewer: '',
      role: '',
      product: {
        name: '',
        image: null,
      },
    });

    // Hide the review form
    setShowReviewForm(false);

    // Show success notification
    toast.success('Review submitted successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Emojis for rating
  const ratingEmojis = ['😠', '😞', '😐', '😊', '😍'];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Ratings & Reviews</h2>

      {!showReviewForm && (
        <button
          onClick={() => setShowReviewForm(true)}
          className="w-full sm:w-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          Write a Review
        </button>
      )}

      {showReviewForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg shadow-sm">
            <label className="block mb-2 font-medium text-gray-700">Rating</label>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                {ratingEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`text-3xl ${
                      index + 1 <= newReview.rating
                        ? 'opacity-100 transform scale-110'
                        : 'opacity-50'
                    } cursor-pointer transition-all duration-200 hover:scale-125`}
                    onClick={() => setNewReview((prev) => ({ ...prev, rating: index + 1 }))}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Review Comment */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg shadow-sm">
            <label className="block mb-2 font-medium text-gray-700">Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, comment: e.target.value }))
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              rows={4}
              placeholder="Share your experience..."
              required
            />
          </div>

          {/* Reviewer Name */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg shadow-sm">
            <label className="block mb-2 font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              value={newReview.reviewer}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, reviewer: e.target.value }))
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Reviewer Role (Dropdown) */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg shadow-sm">
            <label className="block mb-2 font-medium text-gray-700">Your Role</label>
            <select
              value={newReview.role}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, role: e.target.value }))
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Renter">Renter</option>
              <option value="Lender">Lender</option>
            </select>
          </div>

          {/* Product Name */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg shadow-sm">
            <label className="block mb-2 font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={newReview.product.name}
              onChange={(e) =>
                setNewReview((prev) => ({
                  ...prev,
                  product: { ...prev.product, name: e.target.value },
                }))
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Product Image */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg shadow-sm">
            <label className="block mb-2 font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              required
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all transform hover:scale-105"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="w-full sm:w-auto bg-gradient-to-r from-gray-200 to-gray-300 px-6 py-2 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Display Existing Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {ratingEmojis.map((emoji, index) => (
                  <span
                    key={index}
                    className={`text-2xl ${
                      index + 1 <= review.rating ?  'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="mt-2 text-gray-700">{review.comment}</p>
            <div className="mt-3">
              <p className="font-semibold">{review.reviewer}</p>
              <p className="text-sm text-gray-600">{review.role}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-medium">Product Details</h4>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={review.product.image}
                  alt={review.product.name}
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <p className="text-sm font-medium">{review.product.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;