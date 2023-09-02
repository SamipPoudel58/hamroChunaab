import Voter from '../models/voterModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user and get token
// @route POST /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  const { citizenship_no, password } = req.body;

  const voter = await Voter.findOne({ citizenship_no });

  if (voter && (await voter.matchPassword(password))) {
    res.json({
      _id: voter._id,
      name: voter.name,
      citizenship_no: voter.citizenship_no,
      token: generateToken(voter._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid citizenship_no or password');
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerVoter = asyncHandler(async (req, res) => {
  const { name, citizenship_no, password, gender, address, dob, documents } =
    req.body;

  const voterExists = await Voter.findOne({ citizenship_no });

  if (voterExists) {
    res.status(400);
    throw new Error('Voter already exists');
  }

  const voter = await Voter.create({
    name,
    citizenship_no,
    password,
    gender,
    address,
    dob,
    documents,
  });

  if (voter) {
    res.status(201).json({
      msg: 'Voter created succesfully!',
    });
  } else {
    res.status(400);
    throw new Error('Invalid Voter Data');
  }
});
