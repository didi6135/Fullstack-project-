import jwt from 'jsonwebtoken';
import {  Request } from 'express';
import { UserType } from '../4 - models/UserModel';
import { verifyToken } from './verifyAndCreateToken';
import { executeSql } from './dal';


export const verifyAdmin = async (email: string) => {

    const query = `
    SELECT role 
    FROM users 
    WHERE email = "${email}"
    `
    const sql = await executeSql(query)
    
    return sql[0].role === 'admin'
}