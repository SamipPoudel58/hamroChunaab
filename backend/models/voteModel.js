const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voter',
      required: true,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
