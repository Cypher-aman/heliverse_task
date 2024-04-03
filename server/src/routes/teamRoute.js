import { Router } from 'express';
import {
  createTeam,
  getTeamById,
  getTeams,
  addUserToTeam,
  deleteUserFromTeam,
  deleteTeamById,
  getFilteredTeams,
} from '../controllers/teamController.js';

const router = Router();

router.get('/team', getTeams);
router.get('/team/user/:id', getFilteredTeams);
router.get('/team/:id', getTeamById);

router.post('/team', createTeam);
router.put('/team/user/:id', addUserToTeam);
router.delete('/team/user/:id', deleteUserFromTeam);

router.delete('/team/:id', deleteTeamById);

export default router;
