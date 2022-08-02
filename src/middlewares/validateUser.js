import { db } from '../databases/postgreSQL.js';
import jwt from 'jsonwebtoken';

async function validateUser(req, res, next) {
  
    try {
        
        console.log('TEST validateUser')
        next();

    } catch (error) {
      res.sendStatus(500);
    }
  }
  
  export default validateUser;