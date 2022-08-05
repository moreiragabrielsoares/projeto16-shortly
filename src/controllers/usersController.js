import { db } from '../databases/postgreSQL.js';


export async function getUserUrls(req, res) {
    
    const userId = parseInt(res.locals.session.userId);
    
    try {

        const {rows: userUrls} = await db.query(`
            SELECT us."id", us."name", COALESCE(SUM(ur."visitCount"), 0) AS "visitCount", 
                (
                    SELECT JSON_AGG(ROW_TO_JSON(t)) 
                    FROM (
                        SELECT ur."id", ur."shortUrl", ur."url", ur."visitCount" 
                        FROM "urls" ur 
                        LEFT JOIN "users_urls" ON "users_urls"."urlId" = ur."id"
                        LEFT JOIN users us ON us."id" = "users_urls"."userId"
                        WHERE us."id" = 1
                    ) t
                ) AS "shortenedUrls"
            FROM "users" us
            LEFT JOIN "users_urls" ON us."id" = "users_urls"."userId"
            LEFT JOIN "urls" ur ON "users_urls"."urlId" = ur."id"
            WHERE us."id" = 1 
            GROUP BY us."id";`,
            [userId]
        );

        res.status(200).send(userUrls[0]);

    } catch (error) {
        res.sendStatus(500);
    }
}