import jwt from 'jsonwebtoken';
import { request, Request } from 'express';
import { UserType } from '../4 - models/UserModel';



const secretKey = 'trip-for-you'

export const getNewToken = (user: UserType): string => {

    const container = { user }
    
    const option = { expiresIn: '3h' }

    const token = jwt.sign(container, secretKey, option)

    return token
}

export const verifyToken = (Request: Request): Promise<boolean> => {

    return new Promise<boolean>((res, rej) => {

        try {
            // extract header
            const header = request.header("authorization")

            // check if there is header
            if(!header) {
                res(false)
                return
            } 

            // extract token from header
            // Token format:
            // authorization header --> "Bearer the-token"
            //                           01234567
            const token = header.substring(7)

            if(!token) {
                res(false)
                return
            }

            jwt.verify(token, secretKey, (err) => {

                if(err) {
                    res(false)
                    return
                }

                res(true)
            })

        } catch (error) {
            rej(error)
        }
    })
}