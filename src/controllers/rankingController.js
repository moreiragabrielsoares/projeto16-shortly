import { db } from '../databases/postgreSQL.js';


export async function getRanking(req, res) {
    try {

        const { rows: ranking } = await db.query(`
            SELECT us."id", us."name", COUNT(uu."id") AS "linksCount", COALESCE(SUM(ur."visitCount"), 0) AS "visitCount"
            FROM "users" us
            LEFT JOIN "users_urls" uu ON uu."userId" = us."id"
            LEFT JOIN "urls" ur ON ur."id" = uu."urlId"
            GROUP BY us."id"
            ORDER BY "visitCount" DESC, "linksCount" DESC
            LIMIT 10;`
        );

        res.status(200).send(ranking);

    } catch (error) {
        res.sendStatus(500);
    }
}