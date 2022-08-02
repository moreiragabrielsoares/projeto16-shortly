import { db } from '../databases/postgreSQL.js';

export async function getUserUrls(req, res) {
    try {

        res.status(200).send('Test GET getUserUrls');

    } catch (error) {
        res.sendStatus(500);
    }
}