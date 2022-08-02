import { getUserUrls } from '../controllers/usersController.js';
import validateUser from '../middlewares/validateUser.js';
import { Router } from 'express';

const router = Router();

router.get('/users/me', validateUser, getUserUrls);

export default router;