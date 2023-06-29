import express, { Request, Response, NextFunction, response } from 'express';
import { UserType } from '../4 - models/UserModel';
import { registerUser } from '../5 - logic/auth-logic';



const router = express.Router()

router.post('/auth/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body as UserType
        const token = await registerUser(user)
        res.status(201).json(token)
    } catch (error) {
        next(error)
    }
})

export default router;