import { Router } from 'express';
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
} from '../controllers/userController.js';

const router = Router();

router.get('/user', getUser);
router.get('/user/:id', getUserById);

router.post('/user', createUser);
router.put('/user/:id', updateUser);

router.delete('/user/:id', deleteUserById);

export default router;
