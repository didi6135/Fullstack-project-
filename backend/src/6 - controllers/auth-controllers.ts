import express, { Request, Response, NextFunction, response } from 'express';
import { LoginCredentialsType, UserType } from '../4 - models/UserModel';
import { LoginUserLogic, registerUserLogic } from '../5 - logic/auth-logic';



const router = express.Router()

router.post('/auth/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body as UserType
        const token = await registerUserLogic(user)
        res.status(201).json(token)
    } catch (error) {
        next(error)
    }
})


router.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = req.body as LoginCredentialsType;
        const token = await LoginUserLogic(credentials);
        res.status(200).json(token);
    } catch (err: any) {
        next(err)
    }
})

// router.post('/auth/verifyToken', async (req: Request, res: Response, next: NextFunction) => {
//     const { token } = req.body

//     const verifyToken
// })

export default router;