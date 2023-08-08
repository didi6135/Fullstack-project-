import axios from "axios";
import { EditTripType, TripType } from "../types/TripType";
import { appConfig } from "../utils/appConfig";



export const getAllVacations = async (token: string): Promise<EditTripType[]> => {

    const response = await axios.get(appConfig.getAllVacationUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const trips = response.data as EditTripType[]
    return trips
}

export const getAllVacationsIDS = async (token: string): Promise<number[]> => {

  const response = await axios.get(appConfig.getAllVacationIDUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const trips = response.data as number[]
  return trips
}


export const getOneTrip = async (id: number): Promise<EditTripType> => {
  const response = await axios.get(appConfig.getOneVacationUrl + `/${id}`)

  const trip = response.data as EditTripType
  return trip
}


export const addNewTrip = async (trip: TripType, token: string): Promise<TripType> => {

  const response = await axios.post(appConfig.addNewVacationUrl, trip, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

    const addedTrip = response.data as TripType
    return addedTrip
}


export const updateTrip = async(updateTrip: TripType, token: string): Promise<void> => {

  await axios.put(appConfig.updateVacationUrl + `/${updateTrip.TripId}`, updateTrip, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}


export const getTripThatNotStart = async (): Promise<EditTripType> => {

  const response = await axios.get(appConfig.getAllVacationUrl)

  const data = response.data as EditTripType
  return data

}

export const deleteVacationService = async (id: number) => {
  const response = await axios.delete(appConfig.deleteVacationUrl + `/${id}`)

  const data = response.data
  return data
}