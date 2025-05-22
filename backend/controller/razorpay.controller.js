import Razorpay from 'razorpay';
import crypto from 'crypto';

// Create a new Razorpay order
export const createRazorpayOrder = async (req, res) => {
  try {
    // Initialize Razorpay inside the function
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    
    const { amount, currency = 'INR' } = req.body;
    
    const options = {
      amount: amount,
      currency: currency,
      receipt: 'order_' + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order: order
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// Verify Razorpay payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Create a signature using the order_id and payment_id
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');
    
    // Verify the signature
    if (generatedSignature === razorpay_signature) {
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
};