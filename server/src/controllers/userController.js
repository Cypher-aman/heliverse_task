import AppError from '../utils/appError.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppResponse from '../utils/appResponse.js';
import User from '../models/User.js';
import Domain from '../models/Domain.js';
import Gender from '../models/Gender.js';

export const getUser = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const search = req.query.search || '';
  const skip = (page - 1) * limit;

  const domain =
    req.query.domain?.split(',') ||
    (await Domain.find({}).then((data) => data.map((d) => d.domain)));
  const gender =
    req.query.gender?.split(',') ||
    (await Gender.find({}).then((data) => data.map((d) => d.name)));
  const available = req.query.available === 'all' ? 'all' : req.query.available;

  console.log(domain, gender);
  console.log('search', search);
  console.log('available', available);

  const query = {
    $or: [
      { first_name: { $regex: search, $options: 'i' } },
      { last_name: { $regex: search, $options: 'i' } },
    ],
    $and: [{ domain: { $in: domain } }, { gender: { $in: gender } }],
  };

  if (available !== 'all') {
    query.available = available;
  }

  const users = await User.find(query).skip(skip).limit(limit);
  const total = await User.countDocuments(query);

  return AppResponse(res, 200, 'success', {
    totalPages: Math.ceil(total / limit),
    users,
  });
});

export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  return AppResponse(res, 200, 'success', user);
});

export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  return AppResponse(res, 201, 'success', user);
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  return AppResponse(res, 200, 'success', user);
});

export const deleteUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  return AppResponse(res, 200, 'success', user);
});
