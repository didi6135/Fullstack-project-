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

export const addLikeToTrip = async (token: string, userId:number, tripId: number): Promise<number> => {
    const response = await axios.post(appConfig.addLikeToTripUrl + `/${userId}/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    const followers = response.data
    return followers
}

export const checkingFollow = async(userId: number, tripId:number): Promise<boolean> => {
  const response = await axios.get(appConfig.checkIfUserFollowUrl + `/${userId}/${tripId}`)

  const tripFollow = response.data
  return tripFollow
}

export const removingFollowFromTrip = async(userId: number, tripId:number) : Promise<number> => {

  const response = await axios.delete(appConfig.removingFollowUrl + `/${userId}/${tripId}`)
  const removeFollow = response.data
  return removeFollow

}
