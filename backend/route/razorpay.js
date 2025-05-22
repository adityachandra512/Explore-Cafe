import express from 'express';
import { createRazorpayOrder, verifyPayment } from '../controller/razorpay.controller.js';

const router = express.Router();

router.post('/create-razorpay-order', createRazorpayOrder);
router.post('/verify-payment', verifyPayment);

export default router;