import React, { useState } from 'react';
import TrustProfile from './TrustProfile';
import ReviewSection from './ReviewSection';
import DisputeResolution from './DisputeResolution';

const TrustSystem = () => {
  const [userProfile, setUserProfile] = useState({
    userId: '12345',
    name: 'John Doe',
    trustScore: 80,
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
          image: 'https://via.placeholder.com/150',
        },
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
          image: 'https://via.placeholder.com/150',
        },
      },
    ],
    disputes: [],
  });

  const handleReviewSubmit = (newReview) => {
    const review = {
      id: userProfile.reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0],
    };
    setUserProfile((prev) => ({
      ...prev,
      reviews: [...prev.reviews, review],
    }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <TrustProfile userProfile={userProfile} />
        <ReviewSection reviews={userProfile.reviews} onSubmitReview={handleReviewSubmit} />
        <DisputeResolution />
      </div>
    </div>
  );
};

export default TrustSystem;