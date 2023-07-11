import {NextFunction, Response, Request} from 'express'
import { verifyToken } from '../2 - utils/verifyAndCreateToken';
import { UnauthorizedError } from '../4 - models/ErrorModel';


export const verifyLoggedIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const isValid = await verifyToken(req);
        if(!isValid) UnauthorizedError('Invalid token');
        next();
    } catch (err: any) {
        next(err)
    }

}
