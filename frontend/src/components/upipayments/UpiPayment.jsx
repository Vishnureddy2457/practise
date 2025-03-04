// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpiPayment = () => {
//   const [paymentDetails, setPaymentDetails] = useState({});
//   const [upiId, setUpiId] = useState('');

//   useEffect(() => {
//     // Fetch payment details from backend
//     axios.get('/api/payment/details')
//       .then(response => setPaymentDetails(response.data))
//       .catch(error => console.error('Error fetching details:', error));
//   }, []);

//   const handlePayment = () => {
//     if (!upiId) {
//       alert('Please enter a UPI ID');
//       return;
//     }

//     const paymentData = {
//       upiId,
//       amount: paymentDetails.amount,
//       tenantName: paymentDetails.tenantName,
//       property: paymentDetails.property
//     };

//     axios.post('/api/payment/process', paymentData)
//       .then(response => {
//         alert(`Payment successful! Transaction ID: ${response.data.transactionId}`);
//       })
//       .catch(error => alert('Payment failed: ' + error));
//   };

//   return (
//     <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <img src="/logo.png" alt="Logo" className="w-12" />
//         <h1 className="text-2xl font-bold text-gray-800">Pay Rent via UPI</h1>
//         <a href="#" className="text-blue-600 hover:underline">Back</a>
//       </div>

//       {/* Payment Details */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-gray-700">Payment Details</h2>
//         <p className="mt-2"><strong>Tenant:</strong> {paymentDetails.tenantName}</p>
//         <p><strong>Property:</strong> {paymentDetails.property}</p>
//         <p><strong>Amount:</strong> ₹{paymentDetails.amount}</p>
//         <p><strong>Due Date:</strong> {paymentDetails.dueDate}</p>
//       </div>

//       {/* Payment Options */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-gray-700">Choose Payment Method</h2>

//         {/* UPI ID */}
//         <div className="mt-4">
//           <label htmlFor="upi-id" className="block text-gray-600">Enter Your UPI ID</label>
//           <input
//             type="text"
//             id="upi-id"
//             value={upiId}
//             onChange={(e) => setUpiId(e.target.value)}
//             placeholder="e.g., yourname@bank"
//             className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <p className="text-sm text-gray-500 mt-1">Supported: Google Pay, PhonePe, Paytm, etc.</p>
//           <button
//             onClick={handlePayment}
//             className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           >
//             Proceed to Pay
//           </button>
//         </div>

//         {/* QR Code */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-600">Or scan this QR code:</p>
//           <img
//             src="https://via.placeholder.com/200x200?text=Sample+QR+Code"
//             alt="UPI QR Code"
//             className="mx-auto mt-2"
//           />
//           <div className="flex justify-center gap-2 mt-2">
//             <img src="https://via.placeholder.com/30x30?text=GPay" alt="Google Pay" />
//             <img src="https://via.placeholder.com/30x30?text=PhonePe" alt="PhonePe" />
//             <img src="https://via.placeholder.com/30x30?text=Paytm" alt="Paytm" />
//           </div>
//         </div>
//       </div>

//       {/* Instructions */}
//       <div className="text-sm text-gray-600 mb-6">
//         <h3 className="font-semibold">Instructions</h3>
//         <p>1) Enter your UPI ID or scan the QR code.<br />2) Approve the payment in your UPI app.<br />3) Wait for confirmation.</p>
//       </div>

//       {/* Footer */}
//       <div className="text-center text-sm text-gray-500">
//         <p><a href="mailto:support@yourwebsite.com" className="text-blue-600 hover:underline">Need help?</a></p>
//         <p>Secured by Razorpay</p>
//       </div>
//     </div>
//   );
// };

// export default UpiPayment;
















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react'; // Named import for QRCodeSVG
import { FaGooglePay } from "react-icons/fa";
import { SiPaytm, SiPhonepe } from "react-icons/si";

const UpiPayment = () => {
  const [paymentDetails, setPaymentDetails] = useState({});
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQrPopup, setShowQrPopup] = useState(false); // State to control QR code popup

  useEffect(() => {
    axios.get('http://localhost:5000/api/payment/details')
      .then(response => setPaymentDetails(response.data))
      .catch(error => console.error('Error fetching details:', error));
  }, [1]);

  // Handle manual UPI payment via backend
  const handleManualPayment = async () => {
    if (!upiId) {
      alert('Please enter a UPI ID');
      return;
    }

    setLoading(true);
    const paymentData = {
      upiId,
      amount: paymentDetails.amount,
      tenantName: paymentDetails.tenantName,
      property: paymentDetails.property
    };

    try {
      const response = await axios.post('/api/payment/process', paymentData);
      alert(`Payment successful! Transaction ID: ${response.data.transactionId}`);
    } catch (error) {
      alert('Payment failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Generate UPI deep link for specific apps
  const generateUpiLink = (appScheme) => {
    const amount = paymentDetails.amount || 0;
    const property = paymentDetails.property || 'Property';
    const upiId = 'yourbusiness@bank'; // Replace with your actual UPI ID
    const transactionNote = `Rent Payment for ${property}`;
    return `${appScheme}://upi/pay?pa=${upiId}&pn=RentalWebsite&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  };

  // Handle payment via specific UPI apps
  const handleAppPayment = (app) => {
    let url;
    switch (app) {
      case 'googlepay':
        url = generateUpiLink('tez'); // Google Pay scheme
        break;
      case 'paytm':
        url = generateUpiLink('paytmmp'); // Paytm scheme
        break;
      case 'phonepe':
        url = generateUpiLink('phonepe'); // PhonePe scheme
        break;
      default:
        return;
    }

    // Redirect to the app or fallback to the web version
    try {
      window.location.href = url; // Redirect directly
    } catch (error) {
      console.error('Failed to open payment link:', error);
      alert('Unable to open the payment app. Please try again.');
    }
  };

  const qrCodeValue = `upi://pay?pa=yourbusiness@bank&pn=RentalWebsite&am=${paymentDetails.amount || 0}&cu=INR&tn=Rent Payment for ${paymentDetails.property || 'Property'}`;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')", // Replace with your image URL
      }}
    >
      {/* Container */}
      <div
        className=" w-full mx-auto bg-white bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-lg"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 mb-2 sm:mb-0" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">Pay Rent via UPI</h1>
          <a href="/" className="text-blue-600 hover:underline text-sm sm:text-base">Back</a>
        </div>

        {/* Payment Details */}
        <div className="mb-6 flex flex-col items-center gap-4 text-justify">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Payment Details</h2>
          <p className="mt-2 text-sm sm:text-base"><strong>Tenant:</strong> {paymentDetails.userName}</p>
          <p className="text-sm sm:text-base"><strong>Property:</strong> {paymentDetails.property}</p>
          <p className="text-sm sm:text-base"><strong>Amount:</strong> ₹{paymentDetails.amount}</p>
          <p className="text-sm sm:text-base"><strong>Due Date:</strong> {paymentDetails.dueDate}</p>
        </div>

        {/* Payment Options */}
        <div className="mb-6">

          {/* Manual UPI ID Input */}
          <div className="mt-4 p-4 sm:p-6 flex flex-col items-center gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Choose Payment Method</h2>
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="text"
                id="upi-id"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g., yourname@bank"
                className="w-full sm:w-[300px] mt-2 p-2 h-[50px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                disabled={loading}
              />
              <button
                onClick={handleManualPayment}
                className={`w-full sm:w-auto bg-blue-600 text-white px-4 py-2 h-[50px] rounded-md hover:bg-blue-700 text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Proceed to Pay'}
              </button>
            </div>
          </div>

          {/* App-Specific Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Google Pay Button */}
            <button
              onClick={() => handleAppPayment('googlepay')}
              className="bg-green-600 text-white px-4 py-2 w-full sm:w-[120px] rounded-md hover:bg-green-700 text-sm sm:text-base flex flex-col items-center justify-center"
            >
              <FaGooglePay className='text-4xl' />
              <span className="mt-1">Google Pay</span>
            </button>

            {/* Paytm Button */}
            <button
              onClick={() => handleAppPayment('paytm')}
              className="bg-blue-800 text-white px-4 py-2 w-full sm:w-[120px] rounded-md hover:bg-blue-900 text-sm sm:text-base flex flex-col items-center justify-center"
            >
              <SiPaytm className='text-4xl' />
              <span className="mt-1">Paytm</span>
            </button>

            {/* PhonePe Button */}
            <button
              onClick={() => handleAppPayment('phonepe')}
              className="bg-fuchsia-700 text-white px-4 py-2 w-full sm:w-[120px] rounded-md hover:bg-fuchsia-900 text-sm sm:text-base flex flex-col items-center justify-center"
            >
              <SiPhonepe className='text-4xl' />
              <span className="mt-1">PhonePe</span>
            </button>
          </div>

          {/* QR Code Section */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base">Or scan this QR code:</p>
            {!showQrPopup && (
              <button
                onClick={() => setShowQrPopup(true)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-sm sm:text-base mt-2"
              >
                Show QR Code
              </button>
            )}
            {showQrPopup && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200 bg-opacity-75">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                  <QRCodeSVG
                    value={qrCodeValue}
                    size={250} // Larger size for better visibility in popup
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="Q"
                    includeMargin={true}
                    className="mx-auto mt-2"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">Supported: Google Pay, PhonePe, Paytm, etc.</p>
                  <button
                    onClick={() => setShowQrPopup(false)}
                    className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-xs sm:text-sm text-gray-600 mb-6">
          <h3 className="font-semibold">Instructions</h3>
          <p>1) Enter your UPI ID, use an app button, or scan the QR code.<br />2) Approve the payment in your UPI app.<br />3) Wait for confirmation.</p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-gray-500">
          <p><a href="mailto:support@yourwebsite.com" className="text-blue-600 hover:underline">Need help?</a></p>
          <p>Secured by Razorpay</p>
        </div>
      </div>
    </div>
  );
};

export default UpiPayment;