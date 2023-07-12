import { OkPacket } from 'mysql';
import { executeSql } from '../2 - utils/dal'
import { isFollowerThisTrip } from '../4 - models/ErrorModel';
import { FollowersType } from '../4 - models/followersModel';



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