import joi from 'joi';
import { nanoid } from 'nanoid'
import { db } from '../databases/postgreSQL.js';

export async function shortUrls(req, res) {
    
    const newUrl = req.body;
    const userId = parseInt(res.locals.session.userId);
    
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

    const shortUrl = nanoid(10);
    
    try {

        const { rows: id } = await db.query(`
            INSERT INTO "urls" ("url", "shortUrl") 
            VALUES ($1, $2)
            RETURNING "id"`, 
            [newUrl.url, shortUrl]
        );

        const urlId = id[0].id;

        await db.query(`
            INSERT INTO "users_urls" ("userId", "urlId")
            VALUES ($1, $2)`,
            [userId, urlId]
        );

        res.status(201).send({ shortUrl });

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getShortUrlById(req, res) {
    
    try {

        res.status(200).send('Test GET shortUrlById');

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function openShortUrl(req, res) {
    
    try {

        res.status(200).send('Test GET openShortUrl');

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function deleteShortUrlById(req, res) {
    
    try {

        res.status(200).send('Test DELETE deleteShortUrlById');

    } catch (error) {
        res.sendStatus(500);
    }
}