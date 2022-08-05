import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from '../databases/postgreSQL.js';

dotenv.config();

async function validateUser (req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const jwtKey = process.env.JWT_KEY;

    if (!token) {
        res.status(401).send('Invalid header');
        return;
    }

    try {
        const jwtData = jwt.verify(token, jwtKey);
        
        const { rows: tokenDB } = await db.query(`
            SELECT * FROM "users_sessions"
            WHERE "token" = $1`,
            [token]
        );

        if (tokenDB.length === 0) {
            res.status(401).send('Invalid header');
            return;
        }

    } catch (error) {
        res.status(401).send('Invalid header');
        return;
    }

    try {
        const jwtData = jwt.verify(token, jwtKey);
        res.locals.session = jwtData;
        next();
   
    } catch (error) {
        res.sendStatus(500);
        return;
    }

}

export default validateUser;