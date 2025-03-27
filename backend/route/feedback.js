import express from 'express';
import { createFeedback, getAllFeedback } from '../controller/feedback.controller.js';

const router = express.Router();

router.post('/', createFeedback);
router.get('/', getAllFeedback);

export default router;