import express, { Request, Response, NextFunction } from 'express';
import { getAllTrips } from '../5 - logic/trip-logic';
import { verifyLoggedIn } from '../3 - middleware/checkIsLogin';
import { getAllFollowersLogic, addLikeToTripLogic } from '../5 - logic/followers-logics';

const router = express.Router();


// Add new trip
router.put('/followers/tripId/:id([0-9]+)', async (req: Request, res: Response, nextFunc: NextFunction) => {
    try { 
        const userId = req.body.userId
        const tripId = +req.params.id
        const followers = await addLikeToTripLogic(tripId, userId)
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