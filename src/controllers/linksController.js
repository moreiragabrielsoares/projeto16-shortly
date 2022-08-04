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
    
    const urlId = parseInt(req.params.id);

    try {

        const { rows: url } = await db.query(`
            SELECT "id", "shortUrl", "url" 
            FROM "urls" 
            WHERE "id" = $1`, 
            [urlId]
        );

        if(url.length === 0) {
            res.sendStatus(404);
            return;
        }

        res.status(200).send(url[0]);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function openShortUrl(req, res) {
    
    const shortUrl = req.params.shortUrl;

    try {

        const { rows: url } = await db.query(`
            SELECT "url" FROM "urls" 
            WHERE "shortUrl" = $1`, 
            [shortUrl]
        );

        if (url.length === 0) {
            res.sendStatus(404);
            return;
        }

        await db.query(`
            UPDATE "urls" 
            SET "visitCount" = "visitCount" + 1
            WHERE "shortUrl" = $1`, 
            [shortUrl]
        );

        res.redirect(url[0].url);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function deleteShortUrlById(req, res) {
    
    const userId = parseInt(res.locals.session.userId);
    const urlId = parseInt(req.params.id);
    
    try {

        const { rows: url } = await db.query(`
            SELECT "id", "shortUrl", "url" 
            FROM "urls" 
            WHERE "id" = $1`, 
            [urlId]
        );

        if(url.length === 0) {
            res.sendStatus(404);
            return;
        }

        const { rows: urlUserId } = await db.query(`
            SELECT "userId" 
            FROM "users_urls" 
            WHERE "urlId" = $1`, 
            [urlId]
        );
        
        if (userId !== urlUserId[0].userId) {
            res.sendStatus(404);
            return;
        }

        await db.query(`DELETE FROM "users_urls" WHERE "urlId" = $1`, [urlId]);

        await db.query(`DELETE FROM urls WHERE id = $1`, [urlId]);

        res.sendStatus(204);

    } catch (error) {
        res.sendStatus(500);
    }
}