import express, { Request, Response, NextFunction } from 'express';
import { getAllTrips } from '../5 - logic/trip-logic';
import { verifyLoggedIn } from '../3 - middleware/checkIsLogin';
import { getAllFollowersLogic, addLikeToTripLogic } from '../5 - logic/followers-logics';
import { followersType } from '../4 - models/followersModel';

const router = express.Router();


// Add new trip
router.put('/followers/tripId/:id([0-9]+)',verifyLoggedIn,  async (req: Request, res: Response, nextFunc: NextFunction) => {
    try { 
        const newFollower = req.body as followersType
        console.log(newFollower)
        const userId = +req.params.id
        const followers = await addLikeToTripLogic(newFollower)
        res.json(followers)
    } catch (error) {
        nextFunc(error) 
    }
})

// Get one followers
router.get('/followers/:id([0-9]+)',verifyLoggedIn,  async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const id = +req.params.id
        const followers = await getAllFollowersLogic(id)
        res.json(followers)
    } catch (error) {
        nextFunc(error)
    }
})


export default router;