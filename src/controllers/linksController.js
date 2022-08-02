import joi from 'joi';
import { db } from '../databases/postgreSQL.js';

export async function shortUrls(req, res) {
    
    try {

        res.status(200).send('Test POST shortUrl');

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