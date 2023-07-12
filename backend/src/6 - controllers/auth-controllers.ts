import express, { Request, Response, NextFunction, response } from 'express';
import { verifyAdmin } from '../2 - utils/verifyRole';
import { LoginCredentialsType, NewPasswordType, UserType } from '../4 - models/UserModel';
import { changePassword, getUserDetails, LoginUserLogic, registerUserLogic } from '../5 - logic/auth-logic';



const router = express.Router()
// Register
router.post('/auth/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body as UserType
        const token = await registerUserLogic(user)
        res.status(201).json(token)
    } catch (error) {
        next(error)
    }
})

// Login
router.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const credentials = req.body as LoginCredentialsType;
        const token = await LoginUserLogic(credentials);
        // console.log(token)
        // const test = await verifyAdmin(req)
        // res.json(test)
        res.status(200).json(token);
    } catch (err: any) {
        next(err)
    }
})

// Get user details
router.get('/auth/userDetails/:id([0-9]+)', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = +req.params.id

        const userData = await getUserDetails(userId)
        res.status(200).json(userData);
    } catch (err: any) {
        next(err)
    }
})

router.put('/auth/changePassword/:id([0-9]+)', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = +req.params.id
        const newPass = req.body
        console.log(newPass)
        const userData = await changePassword(userId, newPass)
        res.status(200).json(userData);
    } catch (err: any) {
        next(err)
    }
})

export default router;