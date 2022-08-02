import { db } from '../databases/postgreSQL.js';

export async function getRanking(req, res) {
    try {

        res.status(200).send('Test GET ranking');

    } catch (error) {
        res.sendStatus(500);
    }
}