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

    const urlSchema = joi.object({
        url: joi.string().uri().pattern(/^https?:\/\//).required()
    });

    const { error } = urlSchema.validate(newUrl, { abortEarly: false });

    if (error) {
        let msgError = "";
        for (let i = 0 ; i < error.details.length ; i ++) {
            msgError += error.details[i].message;
            msgError += '/';
        }
        res.status(422).send(msgError);
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