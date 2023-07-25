import { OkPacket } from 'mysql';
import { executeSql } from '../2 - utils/dal'
import { isFollowerThisTrip } from '../4 - models/ErrorModel';
import { FollowersType } from '../4 - models/followersModel';
import { EditTripType, TripType } from '../4 - models/TripModel';
import { UserTripType } from '../4 - models/UserModel';
import { getOneTrip } from './trip-logic';
import fs from 'fs'


export const getAllFollowersLogic = async(id: number): Promise<number> => {

    const query = `
    SELECT COUNT(userId) FROM followers WHERE tripId = ${id};
    `
    const allFollowers = await executeSql(query)
    const followerCount = allFollowers[0]['COUNT(userId)'];
    return followerCount

}

export const addLikeToTripLogic = async(userId: number, tripId: number): Promise<number> => {

    const query = `
    INSERT INTO followers(userId, tripId) VALUES (${userId} , ${tripId});
    `
    const allFollowers = await executeSql(query)
    return allFollowers

}

export const removeFollowFromTrip = async (userId: number, tripId: number): Promise<number> => {

    const query = `
    DELETE FROM followers WHERE userId = ${userId} AND tripId = ${tripId}
    `

    const info: OkPacket = await executeSql(query)
    const affectedRows = info.affectedRows as number
    return affectedRows
}


// export const checkIfUserFollower = async (userId: number): Promise<object> => {

//     const query = `
//     SELECT COUNT(*) AS count FROM followers WHERE userId = '${userId}'
//     `
//     const info = await executeSql(query)
//     return info
// }


export const getTripThatUserFollow = async(userId: number, tripId:number):Promise<any> => {

    const query = `
    SELECT * FROM followers WHERE userId = ${userId} AND tripId = ${tripId}
    `

    const tripsFollow = await executeSql(query) as boolean 
    return tripsFollow[0]
}

export const getAllTripThatUserFollow = async (userId: number): Promise<number[]> => {

    const query = `
    SELECT * FROM followers
    WHERE userId = ${userId}
    `
    const info = await executeSql(query)
    const tripIds = info.map(( {tripId} ) => tripId) as number[]
    console.log(tripIds)
    return tripIds
}


export const getAllTripsTest = async (userId: number) :Promise<EditTripType[]> => {
    const query = `
    SELECT v.*
    FROM followers AS f
    JOIN trip AS v ON f.tripId = v.tripId
    WHERE f.userId = ${userId};
    `
    const info = await executeSql(query)
    const allTrips = info  as EditTripType[]
    console.log(allTrips)
    return allTrips
}

// get numbers of followers per trip
export const countFollowersPerTrip = async (tripID: number):Promise<any> => {

    const query = `
    SELECT trip.destination, COUNT(followers.userId) AS followerCount
    FROM trip
    LEFT JOIN followers ON trip.tripId = followers.tripId
    WHERE trip.tripId = ${tripID}
    GROUP BY trip.destination;
    `
    const numFollowers: OkPacket = await executeSql(query)
    const data = numFollowers[0]
    return data
}


export const downloadSummeryToCSV = async() => {
    
try {
    const query = `
    SELECT trip.destination, COUNT(followers.userId) AS followerCount
    FROM trip 
    LEFT JOIN followers ON trip.tripId = followers.tripId 
    WHERE trip.tripId = trip.tripId GROUP BY trip.destination;
    `;

    const getData = await executeSql(query);
    const csvContent = getData
      .map((row) => `${row.destination},${row.followerCount}`)
      .join('\n');
    fs.writeFileSync('data.csv', csvContent);
    console.log('CSV file created successfully!');
  } catch (error) {
    console.error('Error occurred while downloading data:', error);
  }

}