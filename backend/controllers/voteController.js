import Vote from '../models/voteModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc Add a new vote
// @route POST /api/votes
// @access Private
export const createVote = asyncHandler(async (req, res) => {
  const { candidateId } = req.body;

  const vote = await Vote.create({
    voter: req.user._id,
    candidate: candidateId,
  });

  if (vote) {
    res.status(201).json({
      msg: 'Vote created succesfully!',
    });
  } else {
    res.status(400);
    throw new Error('Invalid Vote Data');
  }
});
