// const express = require('express');
// const router = express.Router();
// const Payment = require('../models/Payment');

// router.get('/details', async (req, res) => {
//   // Simulate fetching payment details (replace with real DB query)
//   const paymentDetails = {
//     tenantName: 'John Doe',
//     property: 'Apartment 4B, Green Towers',
//     amount: 15000,
//     dueDate: '2025-03-05'
//   };
//   res.json(paymentDetails);
// });

// router.post('/process', async (req, res) => {
//   const { upiId, amount, tenantName, property } = req.body;

//   // Simulate payment processing (replace with payment gateway API)
//   const payment = new Payment({
//     tenantName,
//     property,
//     amount,
//     upiId,
//     transactionId: `txn_${Date.now()}`, // Placeholder
//     status: 'completed'
//   });

//   await payment.save();
//   res.json({ message: 'Payment successful', transactionId: payment.transactionId });
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Fetch payment details from DB and display them on the payment page
router.get('/details', async (req, res) => {
  // Simulate fetching payment details from DB
  const paymentDetails = {
    userName: 'John Doe',
    property: 'Apartment 4B, Green Towers',
    amount: 1500,
    dueDate: '2025-03-05'
  };
  res.json(paymentDetails);
});

router.post('/process', async (req, res) => {
  const { upiId, amount, tenantName, property } = req.body;
  const paymentGatewayKey = process.env.PAYMENT_GATEWAY_KEY;

  if (!upiId || !amount) {
    return res.status(400).json({ error: 'UPI ID and amount are required' });
  }

  try {
    // Simulate Razorpay-like payment processing
    // In production, use: const Razorpay = require('razorpay');
    // const razorpay = new Razorpay({ key_id: paymentGatewayKey, key_secret: 'your_secret' });
    // const payment = await razorpay.payments.create({ amount: amount * 100, currency: 'INR', payment_capture: 1, method: 'upi', vpa: upiId });

    const simulatedPayment = {
      id: `txn_${Date.now()}`,
      status: 'captured',
      amount: amount * 100, // Razorpay uses paise
      upi_id: upiId
    };

    // Save to MongoDB
    const payment = new Payment({
      tenantName,
      property,
      amount,
      upiId,
      transactionId: simulatedPayment.id,
      status: 'completed'
    });

    await payment.save();
    res.json({ message: 'Payment successful', transactionId: simulatedPayment.id });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
});

module.exports = router;