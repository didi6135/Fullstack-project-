import { AppConfigType } from "../types/AppConfigTypes";


export const appConfig: AppConfigType = {
    registerUrl: "http://localhost:3001/api/auth/register",
    loginUrl: "http://localhost:3001/api/auth/login",
    getUserDetailsUrl: "http://localhost:3001/api/auth/userDetails",
    updateUserDetailsUrl: "http://localhost:3001/api/auth/updateDetails",
    changePasswordUrl: "http://localhost:3001/api/auth/changePassword",

    getAllVacationUrl: "http://localhost:3001/api/trips",
    getAllVacationIDUrl: "http://localhost:3001/api/tripsID",
    getOneVacationUrl: "http://localhost:3001/api/trip",
    addNewVacationUrl: "http://localhost:3001/api/trips/addNewTrip",
    updateVacationUrl: "http://localhost:3001/api/updateTrip",

    getAllFollowersForAllTrip: "http://localhost:3001/api/followers",
    countAllFollowersForAllTrip: "http://localhost:3001/api/countFollowers",
    addLikeToTripUrl: "http://localhost:3001/api/followers/tripId",
    checkIfUserFollowUrl: "http://localhost:3001/api/checkIfUserFollow",
    removingFollowUrl: "http://localhost:3001/api/deleteFollow",
    getAllTripThatUserFollowUrl: "http://localhost:3001/api/getTripsThatUserFollow"
}