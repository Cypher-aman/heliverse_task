import AppError from '../utils/appError.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppResponse from '../utils/appResponse.js';

import Team from '../models/Team.js';
import User from '../models/User.js';

export const getTeams = asyncHandler(async (req, res, next) => {
  const teams = await Team.find();
  return AppResponse(res, 200, 'success', teams);
});

export const getTeamById = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.id).populate('users');
  if (!team) {
    return next(new AppError('Team not found', 404));
  }
  return AppResponse(res, 200, 'success', team);
});

export const createTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.create(req.body);
  return AppResponse(res, 201, 'success', team);
});

export const addUserToTeam = asyncHandler(async (req, res, next) => {
  const userToAdd = await User.findById(req.params.id);
  if (!userToAdd) {
    return next(new AppError('User not found', 404));
  }
  const teams = req.query.teams?.split(',') || [];

  for (const teamId of teams) {
    const team = await Team.findById(teamId).populate('users');
    if (!team) {
      return next(new AppError('Team not found', 404));
    }

    const hasUserFromSameDomain = team.users.some(
      (user) => user.domain === userToAdd.domain
    );
    if (hasUserFromSameDomain) {
      return next(
        new AppError('You can only add one user from same domain', 400)
      );
    }

    team.users.push(userToAdd._id);
    await team.save();
  }
  return AppResponse(res, 200, 'success', teams);
});

export const getFilteredTeams = asyncHandler(async (req, res, next) => {
  // send teams which does not contain user
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  const teams = await Team.find({}).populate('users');

  const filteredTeams = teams.filter((team) => {
    return !team.users.some(
      (u) => u._id.toString() === req.params.id || u.domain === user.domain
    );
  });

  return AppResponse(res, 200, 'success', filteredTeams);
});

export const deleteUserFromTeam = asyncHandler(async (req, res, next) => {
  const userToDelete = await User.findById(req.params.id);
  if (!userToDelete) {
    return next(new AppError('User not found', 404));
  }
  const team = await Team.findById(req.query.teamId).populate('users');
  if (!team) {
    return next(new AppError('Team not found', 404));
  }

  team.users = team.users.filter(
    (member) => member._id.toString() !== userToDelete._id.toString()
  );

  await team.save();
  return AppResponse(res, 200, 'success', team);
});

export const deleteTeamById = asyncHandler(async (req, res, next) => {
  const team = await Team.findByIdAndDelete(req.params.id);
  if (!team) {
    return next(new AppError('Team not found', 404));
  }
  return AppResponse(res, 200, 'success', team);
});
