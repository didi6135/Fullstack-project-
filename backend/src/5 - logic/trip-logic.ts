import { EditTripType, TripType, validateEditTrip, validateTrip } from "../4 - models/TripModel";
import { v4 as uuid } from "uuid";
import { executeSql } from "../2 - utils/dal";
import { OkPacket } from "mysql";
import { resourceNotFound } from "../4 - models/ErrorModel";
import fs from 'fs/promises';


// Add new trip
export const addNewTrip = async (newTrip: TripType): Promise<TripType> => {
    
    if(newTrip.imageFile) {
        const getExtension = newTrip.imageFile.name.substring(newTrip.imageFile.name.lastIndexOf('.'))
        newTrip.imageName = uuid() + getExtension
        await newTrip.imageFile.mv("./src/1 - Assets/images/" + newTrip.imageName)
        delete newTrip.imageFile
        validateTrip(newTrip)
    }
    validateTrip(newTrip)
    
    const query =  `
    INSERT INTO 
    trip
    (destination, TripDescription, DateStart, DateEnd, Price, imageName) 
    VALUES 
    (?, ?, ?, ?, ?, ?);
    `

    const queryVal = [
        newTrip.destination, 
        newTrip.tripDescription,
        newTrip.dateStart,
        newTrip.dateEnd,
        newTrip.price,
        newTrip.imageName
    ]

    const info: OkPacket = await executeSql(query, queryVal);
    newTrip.TripId = info.insertId
    return newTrip
}   


// GEt all trip
export const getAllTrips = async (): Promise<EditTripType[]> => {

    const query = `
    SELECT * FROM trip
    `
    const trips = await executeSql(query) as EditTripType[]
    return trips
}


// get all ID's of trips
export const getAllTripIDS = async(): Promise<number[]> => {

    const query = `
    SELECT tripId FROM trip
    `

    const data = await executeSql(query)
    const tripIds = data.map((obj) => obj.tripId); 
    return tripIds

}

// Update trip
export const updateTripLogic = async (updateTrip: EditTripType): Promise<EditTripType> => {
    
    if(updateTrip.imageFile) {
        const getExtension = updateTrip.imageFile.name.substring(updateTrip.imageFile.name.lastIndexOf('.'))
        updateTrip.imageName = uuid() + getExtension
        await updateTrip.imageFile.mv("./src/1 - Assets/images/" + updateTrip.imageName)
        delete updateTrip.imageFile
        validateEditTrip(updateTrip)
    }
    validateEditTrip(updateTrip)

    const query = `
    UPDATE trip SET
    destination = ?,
    TripDescription = ?,
    DateStart = ?,
    DateEnd = ?,
    Price = ?,
    imageName = ?
    WHERE TripId = ?
    `

    const queryVal = [
        updateTrip.destination, 
        updateTrip.tripDescription,
        updateTrip.dateStart,
        updateTrip.dateEnd,
        updateTrip.price,
        updateTrip.imageName,
        updateTrip.TripId
    ]
    const info: OkPacket = await executeSql(query, queryVal);

    // Set auto increment id to movie
    if (info.affectedRows === 0) resourceNotFound(updateTrip.TripId)

    return updateTrip
}

// Get one trip
export const getOneTrip = async (id: number): Promise<EditTripType> => {

    const query = `
    SELECT * FROM trip WHERE TripId = ?
    `

    const queryVal = [id]
    const trip = await executeSql(query, queryVal) as EditTripType
    return trip[0]
}


// Delete vacation
export const deleteTripLogic = async(id: number) => {
    const imageName = await getImageNameToDeleteFromNode(id)
    const imagePath = `./src/1 - Assets/images/${imageName}`

    const queryVal = [id]

    const deleteFollowers = `
    DELETE FROM followers WHERE tripId = ?
    `
    const infoFollowers: OkPacket = await executeSql(deleteFollowers, queryVal)

    
    const query = `
    DELETE FROM trip WHERE TripId = ?
    ` 


    const info: OkPacket = await executeSql(query, queryVal)


    try {
        await fs.unlink(imagePath);
        console.log('Image deleted successfully.');
      } catch (err) {
        console.error('Error deleting the image:', err);
      }
}

export const getImageNameToDeleteFromNode = async (id: number): Promise<string> => {
    const query = `
    SELECT imageName FROM trip WHERE TripId = ?
    `

    const queryVal = [id]

    const imageName = await executeSql(query, queryVal)
    return imageName[0].imageName as string
}