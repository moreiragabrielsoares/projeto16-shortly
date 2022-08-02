import bcrypt from 'bcrypt';
import joi from 'joi';
import jwt from 'jsonwebtoken';
import { db } from '../databases/postgreSQL.js';

export async function signUpUser(req, res) {

    try {

        res.status(200).send('Test POST signUpUser');

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function signInUser(req, res) {

    try {

        res.status(200).send('Test POST signInUser');

    } catch (error) {
        res.sendStatus(500);
    }
}