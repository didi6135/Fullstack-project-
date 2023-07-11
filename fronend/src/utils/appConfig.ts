import { AppConfigType } from "../types/AppConfigTypes";


export const appConfig: AppConfigType = {
    registerUrl: "http://localhost:3001/api/auth/register",
    loginUrl: "http://localhost:3001/api/auth/login",
    getAllVacationUrl: "http://localhost:3001/api/trips",
    getOneVacationUrl: "http://localhost:3001/api/trip",
    addNewVacationUrl: "http://localhost:3001/api/trips/addNewTrip",
    updateVacationUrl: "http://localhost:3001/api/updateTrip",
    getAllFollowersForAllTrip: "http://localhost:3001/api/followers",
    addLikeToTripUrl: "http://localhost:3001/api/followers/tripId"
}