import { OkPacket } from 'mysql';
import { executeSql } from '../2 - utils/dal'
import { EditTripType } from '../4 - models/TripModel';
import fs from 'fs'


export const getAllFollowersLogic = async(id: number): Promise<number> => {

    const query = `
    SELECT COUNT(userId) FROM followers WHERE tripId = ?;
    `

    const queryVal = [id]

    const allFollowers = await executeSql(query, queryVal)
    const followerCount = allFollowers[0]['COUNT(userId)'];
    return followerCount

}

export const addLikeToTripLogic = async(userId: number, tripId: number): Promise<number> => {

    const query = `
    INSERT INTO followers(userId, tripId) VALUES (? , ?);
    `

    const queryVal = [userId, tripId]

    const allFollowers = await executeSql(query, queryVal)
    return allFollowers

}

export const removeFollowFromTrip = async (userId: number, tripId: number): Promise<number> => {

    const query = `
    DELETE FROM followers WHERE userId = ? AND tripId = ?
    `
    const queryVal = [userId, tripId]

    const info: OkPacket = await executeSql(query, queryVal)
    const affectedRows = info.affectedRows as number
    return affectedRows
}

export const getTripThatUserFollow = async(userId: number, tripId:number):Promise<any> => {

    const query = `
    SELECT * FROM followers WHERE userId = ? AND tripId = ?
    `
    const queryVal = [userId, tripId]

    const tripsFollow = await executeSql(query, queryVal) as boolean 
    return tripsFollow[0]
}

export const getAllTripThatUserFollow = async (userId: number): Promise<number[]> => {

    const query = `
    SELECT * FROM followers
    WHERE userId = ?
    `

    const queryVal = [userId]

    const info = await executeSql(query, queryVal)
    const tripIds = info.map(( {tripId} ) => tripId) as number[]
    return tripIds
}


export const getAllTripsTest = async (userId: number) :Promise<EditTripType[]> => {
    const query = `
    SELECT v.*
    FROM followers AS f
    JOIN trip AS v ON f.tripId = v.tripId
    WHERE f.userId = ${userId};
    `
    const queryVal = [userId]

    const info = await executeSql(query, queryVal)
    const allTrips = info  as EditTripType[]
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

    const queryVal = [tripID]

    const numFollowers: OkPacket = await executeSql(query, queryVal)
    const data = numFollowers[0]
    return data
}

export const downloadSummeryToCSV = async () => {
    try {
      const query = `
        SELECT trip.destination, COUNT(followers.userId) AS followerCount
        FROM trip 
        LEFT JOIN followers ON trip.tripId = followers.tripId 
        WHERE trip.tripId = trip.tripId GROUP BY trip.destination;
      `;
  
      const getData = await executeSql(query);
      const csvContent = getData
        .map((row: { destination: string; followerCount: number }) => `${row.destination},${row.followerCount}`)
        .join('\n');
  
      const filePath = 'data.csv';
  
      fs.writeFileSync(filePath, csvContent); 
      return csvContent
    //   console.log('CSV file created successfully!');
    } catch (error) {
      console.error('Error occurred while downloading data:', error);
    }
  };

// export const downloadSummeryToCSV = async () => {
//     try {
//       const query = `
//       SELECT trip.destination, COUNT(followers.userId) AS followerCount
//       FROM trip 
//       LEFT JOIN followers ON trip.tripId = followers.tripId 
//       WHERE trip.tripId = trip.tripId GROUP BY trip.destination;
//       `;
  
//       const getData = await executeSql(query);
//       const csvContent: Array<object> = getData
//         .map((row: { destination: string; followerCount: number }) => `${row.destination},${row.followerCount}`)
//         .join('\n');
  
//       return csvContent;
//     } catch (error) {
//       console.error('Error occurred while generating CSV data:', error);
//       throw error;
//     }
//   };