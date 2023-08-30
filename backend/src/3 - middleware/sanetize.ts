import {NextFunction, Response, Request} from 'express'
import striptags from 'striptags'

export const sanitize = (req: Request, res: Response, next: NextFunction) => {

    for(const prop in req.body){
        if(typeof req.body[prop] === 'string'){
            req.body[prop] = striptags(req.body[prop])
        }
    }
    next();
}
