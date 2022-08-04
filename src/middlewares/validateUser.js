import jwt from 'jsonwebtoken';
import joi from 'joi';
import dotenv from 'dotenv';
import { db } from '../databases/postgreSQL.js';

dotenv.config();

async function validateUser (req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const newUrl = req.body;
    const jwtKey = process.env.JWT_KEY;

    if (!token) {
        res.status(401).send('Invalid header');
        return;
    }

    try {
        const jwtData = jwt.verify(token, jwtKey);
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