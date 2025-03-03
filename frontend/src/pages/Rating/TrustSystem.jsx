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
        "id": 1,
        "rating": 2,
        "comment": "Item not received, no response from seller",
        "reviewer": "John Doe",
        "date": "2025-02-28",
        "role": "Customer, Online Shopper",
        "product": {
          "name": "Wireless Earbuds",
          "id": "P101",
          "image": "https://example.com/images/wireless-earbuds.jpg"
        }
      },
      {
        "id": 2,
        "rating": 1,
        "comment": "Received a defective product, return process is too slow",
        "reviewer": "Jane Smith",
        "date": "2025-02-25",
        "role": "Verified Buyer",
        "product": {
          "name": "Smartphone X",
          "id": "P102",
          "image": "https://example.com/images/smartphone-x.jpg"
        }
      },
      {
        "id": 3,
        "rating": 3,
        "comment": "Transaction disputed due to unauthorized charge",
        "reviewer": "Mark Wilson",
        "date": "2025-02-26",
        "role": "Bank Account Holder",
        "product": {
          "name": "Premium Headphones",
          "id": "P103",
          "image": "https://example.com/images/headphones.jpg"
        }
      },
      {
        "id": 4,
        "rating": 4,
        "comment": "Workplace dispute resolved fairly, but took too long",
        "reviewer": "Sarah Lee",
        "date": "2025-02-28",
        "role": "Software Engineer, TechCorp",
        "product": {
          "name": "Ergonomic Office Chair",
          "id": "P104",
          "image": "https://example.com/images/office-chair.jpg"
        }
      },
      {
        "id": 5,
        "rating": 5,
        "comment": "Service fee incorrectly charged, still waiting for refund",
        "reviewer": "Kevin Davis",
        "date": "2025-02-26",
        "role": "Bank Customer",
        "product": {
          "name": "Credit Card Annual Fee",
          "id": "P105",
          "image": "https://example.com/images/credit-card.jpg"
        }
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