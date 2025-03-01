import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DisputeResolution = () => {
  const [activeDispute, setActiveDispute] = useState(null);

  // Function to start a dispute
  const startDispute = () => {
    setActiveDispute({ status: 'direct_resolution', description: '', evidence: [] });
  };

  // Function to cancel a dispute
  const cancelDispute = () => {
    setActiveDispute(null);
  };

  // Function to submit a dispute for review
  const submitForReview = () => {
    if (!activeDispute.description.trim()) {
      toast.error('Please describe the issue before submitting.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Simulate submission logic
    setActiveDispute(null);
    toast.success('Dispute submitted for review!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Issue Resolution</h2>

      {/* Toast Container */}
      {/* <ToastContainer /> */}

      {!activeDispute ? (
        <div className="text-center sm:text-left">
          <p className="mb-4 text-sm sm:text-base">
            Having issues with a transaction? Start the resolution process here.
          </p>
          <button
            onClick={startDispute}
            className="w-full sm:w-auto bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
           Enter Your Issue 
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
              onChange={(e) =>
                setActiveDispute((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex gap-2">
            <button
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={submitForReview}
            >
              Submit for Review
            </button>
            <button
              className="w-full sm:w-auto bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={cancelDispute}
            >
              Cancel Issue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeResolution;