import express, { Request, Response, NextFunction } from 'express';
import { EditTripType, TripType } from '../4 - models/TripModel';
import { addNewTrip, deleteTripLogic, getAllTripIDS, getAllTrips, getOneTrip, updateTripLogic } from '../5 - logic/trip-logic';
import { verifyLoggedIn } from '../3 - middleware/checkIsLogin';
import multer from 'multer'
import path from 'path';

const router = express.Router();
const upload = multer({dest: './src/1 - Assets/images'})


// Add new trip
router.post('/trips/addNewTrip', async (req: Request, res: Response, nextFunc: NextFunction) => {
    try { 

        req.body.imageFile = req.files?.imageFile;
        
        const newTrip: TripType = req.body
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

// Get all trips ID's
router.get('/tripsID', async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const trips = await getAllTripIDS()
        res.json(trips)
    } catch (error) {
        nextFunc(error)
    }
})

// Get one trip
router.get('/trip/:id([0-9]+)', async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const id = +req.params.id
        // const getTrip = req.body as TripType 
        const getTripById = await getOneTrip(id)
        res.json(getTripById)
    } catch (error) {
        nextFunc(error)
    }
})

// Update trip
router.put('/updateTrip/:id([0-9]+)', verifyLoggedIn, async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        req.body.TripId = +req.params.id
        req.body.imageFile = req.files?.imageFile;

        const updateTrip = req.body as EditTripType 
        const updatedTrip = await updateTripLogic(updateTrip)
        res.json(updatedTrip)
    } catch (error) {
        nextFunc(error)
    }
})

// Get image
router.get('/image/:imageName', async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const imageFolderPath = path.join(__dirname,'..', '1 - Assets', 'images')
 
        const image = req.params.imageName
        const imageUrl = path.join(imageFolderPath, image)
        res.sendFile(imageUrl)
    } catch (error) {
        nextFunc(error)
    }
})

router.delete('/deleteVacation/:id', verifyLoggedIn , async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const id = +req.params.id

        const deleteTrip = await deleteTripLogic(id)
        res.json(deleteTrip)
    } catch (error) {
        nextFunc(error)
    }
})



export default router;