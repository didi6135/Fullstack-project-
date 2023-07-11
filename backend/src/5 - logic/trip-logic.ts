import { EditTripType, TripType, validateTrip } from "../4 - models/TripModel";
import { v4 as uuid } from "uuid";
import { executeSql } from "../2 - utils/dal";
import { OkPacket } from "mysql";
import { resourceNotFound } from "../4 - models/ErrorModel";




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
    ("${newTrip.destination}",
     "${newTrip.tripDescription}",
     "${newTrip.dateStart}",
     "${newTrip.dateEnd}",
     "${newTrip.price}",
     "${newTrip.imageName}");
    `
    const info: OkPacket = await executeSql(query);
    newTrip.TripId = info.insertId
    return newTrip
}   


export const getAllTrips = async (): Promise<TripType[]> => {

    const query = `
    SELECT * FROM trip
    `
    const trips = await executeSql(query) as TripType[]
    return trips
}

export const updateTripLogic = async (updateTrip: TripType): Promise<TripType> => {
    
    if(updateTrip.imageFile) {
        const getExtension = updateTrip.imageFile.name.substring(updateTrip.imageFile.name.lastIndexOf('.'))
        updateTrip.imageName = uuid() + getExtension
        await updateTrip.imageFile.mv("./src/1 - Assets/images/" + updateTrip.imageName)
        delete updateTrip.imageFile
        validateTrip(updateTrip)
    }
    
    const query = `
    UPDATE trip SET
    destination = "${updateTrip.destination}",
    TripDescription = "${updateTrip.tripDescription}",
    DateStart = "${updateTrip.dateStart}",
    DateEnd = "${updateTrip.dateEnd}",
    Price = "${updateTrip.price}",
    imageName = "${updateTrip.imageName}"
    WHERE TripId = ${updateTrip.TripId}
    `
    const info: OkPacket = await executeSql(query);

    // Set auto increment id to movie
    if (info.affectedRows === 0) resourceNotFound(updateTrip.TripId)

    return updateTrip
}

export const getOneTrip = async (id: number): Promise<EditTripType> => {

    const query = `
    SELECT * FROM trip WHERE TripId = ${id}
    `
    const trip = await executeSql(query) as EditTripType
    return trip[0]
}

