import axios from "axios";
import { FollowersType } from "../types/followerType";
import { appConfig } from "../utils/appConfig";



export const getAllFollowersService = async (token: string, id: number): Promise<number> => {

    const response = await axios.get(appConfig.getAllFollowersForAllTrip + `/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    const followers = response.data
    return followers
}

export const addLikeToTrip = async (token: string, triId: number, addFoolower: FollowersType): Promise<number> => {
    console.log(addFoolower)
    const response = await axios.put(appConfig.addLikeToTripUrl + `/${triId}`, addFoolower, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    const followers = response.data
    return followers
}