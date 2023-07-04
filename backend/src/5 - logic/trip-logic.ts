import { TripType, validateTrip } from "../4 - models/TripModel";
import { v4 as uuid } from "uuid";
import { executeSql } from "../2 - utils/dal";
import { OkPacket } from "mysql";




export const addNewTrip = async (newTrip: TripType): Promise<TripType> => {
    
    
    if(newTrip.imageFile) {
        const getExtension = newTrip.imageFile.name.substring(newTrip.imageFile.name.lastIndexOf('.'))
        newTrip.imageName = uuid() + getExtension
        await newTrip.imageFile.mv("./src/1 - Assets/images/" + newTrip.imageName)
        delete newTrip.imageFile
        validateTrip(newTrip)
    }
    


    const query =  `
    INSERT INTO 
    trip
    (destination, TripDescription, DateStart, DateEnd, Price, imageName, Followers) 
    VALUES 
    ("${newTrip.destination}",
     "${newTrip.tripDescription}",
     "${newTrip.dateStart}",
     "${newTrip.dateEnd}",
     "${newTrip.price}",
     "${newTrip.imageName}", 0);
    `
    const info: OkPacket = await executeSql(query);
    newTrip.tripId = info.insertId
    return newTrip
}   


export const getAllTrips = async (): Promise<TripType[]> => {

    const query = `
    SELECT * FROM trip
    `
    const trips = await executeSql(query) as TripType[]
    return trips
}


