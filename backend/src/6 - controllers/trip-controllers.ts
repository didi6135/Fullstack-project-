import express, { Request, Response, NextFunction } from 'express';
import { TripType } from '../4 - models/TripModel';
import { addNewTrip, getAllTrips } from '../5 - logic/trip-logic';
import multer from 'multer'
import { verifyLoggedIn } from '../3 - middleware/checkIsLogin';

const router = express.Router();
const upload = multer({dest: './src/1 - Assets/images'})


// Add new trip
router.post('/trips/addNewTrip', async (req: Request, res: Response, nextFunc: NextFunction) => {
    try { 

        req.body.imageFile = req.files?.imageFile;
        
        const newTrip: TripType = req.body
        console.log(newTrip)
        const addedTrip = await addNewTrip(newTrip)

        res.json(addedTrip)
    } catch (error) {
        nextFunc(error) 
    }
})

// Get all trips
router.get('/trips', verifyLoggedIn, async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const trips = await getAllTrips()
        res.json(trips)
    } catch (error) {
        nextFunc(error)
    }
})


export default router;