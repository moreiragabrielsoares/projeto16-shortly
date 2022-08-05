import { db } from '../databases/postgreSQL.js';


export async function getUserUrls(req, res) {
    
    const userId = parseInt(res.locals.session.userId);
    
    try {

        const {rows: userUrls} = await db.query(`
            SELECT us."id", us."name", SUM(ur."visitCount") AS "visitCount", 
                (
                    SELECT JSON_AGG(ROW_TO_JSON(t)) 
                    FROM (
                        SELECT ur."id", ur."shortUrl", ur."url", ur."visitCount" 
                        FROM "urls" ur 
                        JOIN "users_urls" ON "users_urls"."urlId" = ur."id"
                        JOIN users us ON us."id" = "users_urls"."userId"
                        WHERE us."id" = $1
                    ) t
                ) AS "shortenedUrls"
            FROM "users" us
            JOIN "users_urls" ON us."id" = "users_urls"."userId"
            JOIN "urls" ur ON "users_urls"."urlId" = ur."id"
            WHERE us."id" = $1 
            GROUP BY us."id";`,
            [userId]
        );

        res.status(200).send(userUrls[0]);

    } catch (error) {
        res.sendStatus(500);
    }
}