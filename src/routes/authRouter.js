import { signInUser, signUpUser } from '../controllers/authController.js';
import { Router } from 'express';

const router = Router();

router.post('/signin', signInUser);
router.post('/signup', signUpUser);

export default router;