import express from 'express';
import { createOrder, getAllOrders, updateOrderStatus } from '../controller/order.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.patch('/:id/status', updateOrderStatus);

export default router;