import { shortUrls, getShortUrlById , openShortUrl , deleteShortUrlById } from '../controllers/linksController.js';
import validateUser from '../middlewares/validateUser.js';
import { Router } from 'express';

const router = Router();

router.post('/urls/shorten', validateUser, shortUrls);
router.get('/urls/:id', getShortUrlById);
router.get('/urls/open/:shortUrl', openShortUrl);
router.delete('/urls/:id', validateUser, deleteShortUrlById);

export default router;