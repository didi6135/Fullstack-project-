import { executeSql } from '../2 - utils/dal'
import { followersType } from '../4 - models/followersModel';



export const getAllFollowersLogic = async(id: number): Promise<number> => {

    const query = `
    SELECT COUNT(userId) FROM followers WHERE tripId = ${id};
    `
    const allFollowers = await executeSql(query)
    const followerCount = allFollowers[0]['COUNT(userId)'];
    return followerCount

}

export const addLikeToTripLogic = async(newFollower: followersType): Promise<number> => {

    const query = `
    INSERT INTO  followers(userId, tripId) VALUES (${newFollower.userId} , ${newFollower.TripId});
    `
    const allFollowers = await executeSql(query)
    const followerCount = allFollowers[0]['COUNT(userId)'];
    return followerCount

}