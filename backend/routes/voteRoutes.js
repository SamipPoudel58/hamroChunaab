import express from 'express';
import { createVote } from '../controllers/voteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createVote);

export default router;
