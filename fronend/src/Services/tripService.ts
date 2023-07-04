import axios from "axios";
import { TripType } from "../types/TripType";
import { appConfig } from "../utils/appConfig";



export const getAllVacations = async (token: string | undefined): Promise<TripType[]> => {

    const response = await axios.get(appConfig.getAllVacationUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const trips = response.data as TripType[]
    return trips
}

export const addNewTrip = async (trip: TripType): Promise<TripType> => {
    // trip.imageName = trip.imageFile?.name
    const response = await axios.post(appConfig.addNewVacationUrl, trip, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    const addedTrip = response.data as TripType

    return addedTrip
}