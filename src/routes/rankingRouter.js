import { getRanking } from '../controllers/rankingController.js';
import { Router } from 'express';

const router = Router();

router.get('/ranking', getRanking);

export default router;