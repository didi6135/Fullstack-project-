import express, { Request, Response, NextFunction } from 'express';
import { getAllFollowersLogic, addLikeToTripLogic, getTripThatUserFollow, removeFollowFromTrip, getAllTripThatUserFollow, getAllTripsTest, countFollowersPerTrip, downloadSummeryToCSV } from '../5 - logic/followers-logics';

const router = express.Router();


// Add new follow
router.post('/followers/tripId/:userId([0-9]+)/:tripId([0-9]+)',  async (req: Request, res: Response, nextFunc: NextFunction) => {
    try { 

        const userId = +req.params.userId
        const tripId = +req.params.tripId
        const followers = await addLikeToTripLogic(userId, tripId)
        res.json(followers)
    } catch (error) {
        nextFunc(error) 
    }
})

// Get all follower
router.get('/followers/:id([0-9]+)',  async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const id = +req.params.id
        const followers = await getAllFollowersLogic(id)
        res.json(followers)
    } catch (error) {
        nextFunc(error)
    }
})

// number of followers per trip
router.get('/countFollowers/:id([0-9]+)',  async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        downloadSummeryToCSV()
        const id = +req.params.id
        const followers = await countFollowersPerTrip(id)
        res.json(followers)
    } catch (error) {
        nextFunc(error)
    }
})

// Get all trip that user Follow
router.get('/getTripsThatUserFollow/:userId([0-9]+)',  async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const userId = +req.params.userId
        // const userFollow = await getAllTripThatUserFollow(userId)
        const userFollow = await getAllTripsTest(userId)
        res.json(userFollow)
    } catch (error) {
        nextFunc(error)  
    }
})

// Get trip that user Follow
router.get('/checkIfUserFollow/:userId([0-9]+)/:tripId([0-9]+)',  async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const userId = +req.params.userId
        const tripId = +req.params.tripId
        const userFollow = await getTripThatUserFollow(userId, tripId)
        res.json(userFollow)
    } catch (error) {
        nextFunc(error)
    }
})

// Remove the follow from trip
router.delete('/deleteFollow/:userId([0-9]+)/:tripId([0-9]+)',  async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const userId = +req.params.userId
        const tripId = +req.params.tripId
        const userFollow = await removeFollowFromTrip(userId, tripId)
        res.json(userFollow)
    } catch (error) {
        nextFunc(error)
    }
})

// Download CSV summery
router.get('/download-csv',  async (req: Request, res: Response, nextFunc: NextFunction) => {

    try {
        const csvFile = await downloadSummeryToCSV()
        res.send(csvFile)
    } catch (error) {
        nextFunc(error)
    }
})


export default router;