import axios from "axios";
import { EditTripType } from "../types/TripType";
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

// check if user follow after this trip
export const checkingFollow = async(userId: number, tripId:number): Promise<boolean> => {
  const response = await axios.get(appConfig.checkIfUserFollowUrl + `/${userId}/${tripId}`)

  const tripFollow = response.data as boolean
  return tripFollow
}

// remove follow from trip
export const removingFollowFromTrip = async(userId: number, tripId:number) : Promise<number> => {

  const response = await axios.delete(appConfig.removingFollowUrl + `/${userId}/${tripId}`)
  const removeFollow = response.data
  return removeFollow

}

export const getTripsThatUserFollowService = async (userId: number): Promise<EditTripType[]> => {
  const response = await axios.get(appConfig.getAllTripThatUserFollowUrl + `/${userId}`)

  const tripsID = response.data as EditTripType[]
  return tripsID
}

export const countFollowersPerTripService = async(tripID: number, token: string) => {

  const response = await axios.get(appConfig.countAllFollowersForAllTrip + `/${tripID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = response.data
  console.log(data)
  return data

} 
