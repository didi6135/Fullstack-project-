import express, { Request, Response, NextFunction } from 'express';
import { TripType } from '../4 - models/TripModel';
import { addNewTrip, getAllTrips } from '../5 - logic/trip-logic';


const router = express.Router();

router.post('/trips', async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {

        req.body.imageFile = req.files?.imageFile;
        
        const newTrip: TripType = req.body
        
        const addedTrip = await addNewTrip(newTrip)

        res.json(addedTrip)
    } catch (error) {
        nextFunc(error) 
    }
})

router.get('/trips', async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const trips = await getAllTrips()
        res.json(trips)
    } catch (error) {
        nextFunc(error)
    }
})


export default router;