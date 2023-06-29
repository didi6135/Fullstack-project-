import jwt from 'jsonwebtoken';
import {  Request } from 'express';
import { UserType } from '../4 - models/UserModel';
import { verifyToken } from './verifyAndCreateToken';



interface UserContainer {
    user: UserType
}


export const verifyAdmin = async (request: Request): Promise<boolean> => {

    const isLoggedIn = await verifyToken(request)

    if(!isLoggedIn) return false

    const header = request.header("authorization")
    const token = header.substring(7)

    const container = jwt.decode(token) as UserContainer

    const user = container.user

    return user.role === "admin"
}