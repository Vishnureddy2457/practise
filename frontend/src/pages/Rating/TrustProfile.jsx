import React from 'react';

const TrustProfile = ({ userProfile }) => {
  // Calculate the average rating from reviews
  const calculateTrustScore = (reviews) => {
    if (reviews.length === 0) return 0; // Default score if no reviews
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / reviews.length) * 20); // Convert average rating to a score out of 100
  };

  const trustScore = calculateTrustScore(userProfile.reviews);

  const getTrustLevel = (score) => {
    if (score >= 80) return { label: 'Excellent ⭐⭐⭐⭐⭐', color: 'bg-green-100 text-green-800', emoji: '😊' };
    if (score >= 60) return { label: 'Good ⭐⭐⭐⭐', color: 'bg-blue-100 text-blue-800', emoji: '🙂' };
    return { label: 'Needs Improvement ⭐⭐', color: 'bg-yellow-100 text-yellow-800', emoji: '😐' };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Trust Profile</h2>
        {userProfile.verificationLevel === 'verified' && (
          <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
            ✓ Verified
          </span>
        )}
      </div>

      <div className="space-y-4 flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 lg:space-x-30">
        {/* Trust Score Card */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Trust Score
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-4xl font-bold text-gray-900">
              {trustScore}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getTrustLevel(trustScore).color}`}
            >
              {getTrustLevel(trustScore).label} {getTrustLevel(trustScore).emoji}
            </span>
          </div>
        </div>

        {/* Completed Rentals Card */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Activity
          </h3>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {userProfile.completedRentals} successful rentals
          </p>
          <p className="text-sm text-gray-500">
            Consistent and reliable renter
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustProfile;