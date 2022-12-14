import bcrypt from 'bcrypt';
import joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from '../databases/postgreSQL.js';

dotenv.config();

export async function signUpUser(req, res) {

    const newUser = req.body;

    // Password Regex: Minimum eight characters, at least one letter, one number and one special character(@$!%*#?&)
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(), 
        confirmPassword: joi.string().required()
    });

    const { error } = userSchema.validate(newUser, { abortEarly: false });
    if (error) {
        
        let msgError = "";

        for (let i = 0 ; i < error.details.length ; i ++) {
            if (error.details[i].message.includes('password')) {
                msgError += '"password" must be a valid password/';
                continue;
            }
            msgError += error.details[i].message;
            msgError += '/';
        }

        res.status(422).send(msgError);
        return;
    }

    if (newUser.password !== newUser.confirmPassword) {
        res.status(422).send('"password" and "confirmPassword" do not match');
        return;
    }

    try {

        const { rows: userDB } = await db.query(`
            SELECT * FROM users
            WHERE users."email" = $1`,
            [newUser.email]
        );

        if (userDB.length !== 0) {
            res.status(409).send('E-mail already registered');
            return;
        }

        const encryptedPassword = bcrypt.hashSync(newUser.password, 10);
        
        await db.query(`
            INSERT INTO users ("name", "email", "password") 
            VALUES ($1, $2, $3)`, 
            [newUser.name, newUser.email, encryptedPassword]
        );

        res.status(201).send('New user registered');

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function signInUser(req, res) {

    const user = req.body;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const { error } = userSchema.validate(user, { abortEarly: false });

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

        const { rows: userDB } = await db.query(`
            SELECT * FROM users
            WHERE users."email" = $1`,
            [user.email]
        );

        if (userDB.length !== 0 && bcrypt.compareSync(user.password, userDB[0].password)) {

            const TIME_ONE_DAY_SEC = 60*60*24;

            const jwtData = { userId: userDB[0].id };
            const jwtKey = process.env.JWT_KEY;
            const jwtConfig = { expiresIn: TIME_ONE_DAY_SEC };
            const token = jwt.sign(jwtData, jwtKey, jwtConfig); 

            await db.query(`
                INSERT INTO "users_sessions" ("userId", "token") 
                VALUES ($1, $2)`, 
                [userDB[0].id, token]
            );

            res.status(200).send({ token });
            return;

        } else {
            res.status(401).send('Invalid credentials');
            return;
        }

    } catch (error) {
        res.sendStatus(500);
    }
}