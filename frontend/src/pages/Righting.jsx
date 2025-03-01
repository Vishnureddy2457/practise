import React, { useState } from 'react';

const TrustSystempage = () => {
  const [userProfile, setUserProfile] = useState({
    userId: '12345',
    name: 'John Doe',
    trustScore: 85,
    verificationLevel: 'verified',
    completedRentals: 12,
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: 'Great renter, took good care of the equipment',
        reviewer: 'Alice',
        date: '2025-02-20',
        role: 'Product Designer, slothUI',
        product: {
          name: 'Camera Lens 50mm',
          id: 'P001',
          image: 'https://via.placeholder.com/150'
        }
      },
      {
        id: 2,
        rating: 4,
        comment: 'Communication could be better, but overall good',
        reviewer: 'Bob',
        date: '2025-02-18',
        role: 'Former President of US',
        product: {
          name: 'Drone Pro X',
          id: 'P002',
          image: 'https://via.placeholder.com/150'
        }
      }
    ],
    disputes: []
  });

  const [activeDispute, setActiveDispute] = useState(null);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    reviewer: '',
    role: '',
    product: {
      name: '',
      id: '',
      image: ''
    }
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Helper function to determine trust level
  const getTrustLevel = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600' };
    return { label: 'Needs Improvement', color: 'text-yellow-600' };
  };

  // StarRating component
  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-xl sm:text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: userProfile.reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };
    setUserProfile(prev => ({
      ...prev,
      reviews: [...prev.reviews, review]
    }));
    setNewReview({
      rating: 0,
      comment: '',
      reviewer: '',
      role: '',
      product: {
        name: '',
        id: '',
        image: ''
      }
    });
    setShowReviewForm(false);
  };
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
  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Trust Score Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-bold">Trust Profile</h2>
            {userProfile.verificationLevel === 'verified' && (
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full w-fit">
                ✓ Verified User
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold">Trust Score</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl sm:text-3xl font-bold">{userProfile.trustScore}</span>
                <span className={`${getTrustLevel(userProfile.trustScore).color} font-medium text-sm sm:text-base`}>
                  {getTrustLevel(userProfile.trustScore).label}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold">Activity</h3>
              <p className="text-gray-600 mt-2">
                {userProfile.completedRentals} successful rentals
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Ratings & Reviews</h2>

          {!showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="w-full sm:w-auto mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Write a Review
            </button>
          )}

          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mb-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 font-medium">Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-xl sm:text-2xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                        } cursor-pointer`}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 font-medium">Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Share your experience..."
                  required
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  value={newReview.reviewer}
                  onChange={(e) => setNewReview(prev => ({ ...prev, reviewer: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 font-medium">Your Role</label>
                <input
                  type="text"
                  value={newReview.role}
                  onChange={(e) => setNewReview(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your role"
                  required
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 font-medium">Product Name</label>
                <input
                  type="text"
                  value={newReview.product.name}
                  onChange={(e) => setNewReview(prev => ({
                    ...prev,
                    product: { ...prev.product, name: e.target.value }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 font-medium">Product ID</label>
                <input
                  type="text"
                  value={newReview.product.id}
                  onChange={(e) => setNewReview(prev => ({
                    ...prev,
                    product: { ...prev.product, id: e.target.value }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product ID"
                  required
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label>
                  Product Image:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </label>

              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="w-full sm:w-auto bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Flex Cards for Reviews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
            {userProfile.reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <StarRating rating={review.rating} />
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
                      <p className="text-xs text-gray-500">ID: {review.product.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispute Resolution Section */}
        <div className="bg-white rounded-lg shadow-md p-10 sm:p-10">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Dispute Resolution</h2>

          {!activeDispute ? (
            <div className="text-center sm:text-left">
              <p className="mb-4 text-sm sm:text-base">
                Having issues with a transaction? Start the resolution process here.
              </p>
              <button
                onClick={() => setActiveDispute({ status: 'direct_resolution', description: '', evidence: [] })}
                className="w-full sm:w-auto bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Start Dispute
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-700 text-sm sm:text-base">
                  {activeDispute.status === 'direct_resolution'
                    ? 'Direct resolution in progress. Try resolving the issue through chat first.'
                    : 'Mediation in progress'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block mb-2 font-medium">Describe the issue</label>
                <textarea
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Provide details about your dispute..."
                  value={activeDispute.description}
                  onChange={(e) => setActiveDispute(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => {/* Implement next step in dispute resolution */ }}
                >
                  Submit for Review
                </button>
                <button
                  className="w-full sm:w-auto bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => setActiveDispute(null)}
                >
                  Cancel Dispute
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrustSystempage;