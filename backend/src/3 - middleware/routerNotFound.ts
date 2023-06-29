import {NextFunction, Response, Request} from 'express'
import { RouterNotFoundError } from '../4 - models/ErrorModel'


export const routeNotFoundMW = (req: Request, res: Response, next: NextFunction) => {
    
    const err = RouterNotFoundError(req.originalUrl)
    next(err)
}