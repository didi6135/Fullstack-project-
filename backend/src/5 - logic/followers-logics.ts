import { executeSql } from '../2 - utils/dal'



export const getAllFollowersLogic = async(id: number): Promise<number> => {

    const query = `
    SELECT COUNT(userId) FROM followers WHERE tripId = ${id};
    `
    const allFollowers = await executeSql(query)
    const followerCount = allFollowers[0]['COUNT(userId)'];
    return followerCount

}

export const addLikeToTripLogic = async(tripId: number, userId: number): Promise<number> => {

    const query = `
    INSERT INTO  followers(userId, tripId) VALUES (${userId} , ${tripId});
    `
    const allFollowers = await executeSql(query)
    const followerCount = allFollowers[0]['COUNT(userId)'];
    return followerCount

}