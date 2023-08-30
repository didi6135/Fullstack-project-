import { AppConfigType } from "../types/AppConfigTypes";


// export const appConfig: AppConfigType = {
//     registerUrl: "http://localhost:3001/api/auth/register",
//     loginUrl: "http://localhost:3001/api/auth/login",
//     getUserDetailsUrl: "http://localhost:3001/api/auth/userDetails",
//     updateUserDetailsUrl: "http://localhost:3001/api/auth/updateDetails",
//     changePasswordUrl: "http://localhost:3001/api/auth/changePassword",

//     getAllVacationUrl: "http://localhost:3001/api/trips",
//     getAllVacationIDUrl: "http://localhost:3001/api/tripsID",
//     getOneVacationUrl: "http://localhost:3001/api/trip",
//     addNewVacationUrl: "http://localhost:3001/api/trips/addNewTrip",
//     updateVacationUrl: "http://localhost:3001/api/updateTrip",
//     deleteVacationUrl: 'http://localhost:3001/api/deleteVacation',

//     getAllFollowersForAllTrip: "http://localhost:3001/api/followers",
//     countAllFollowersForAllTrip: "http://localhost:3001/api/countFollowers",
//     addLikeToTripUrl: "http://localhost:3001/api/followers/tripId",
//     checkIfUserFollowUrl: "http://localhost:3001/api/checkIfUserFollow",
//     removingFollowUrl: "http://localhost:3001/api/deleteFollow",
//     getAllTripThatUserFollowUrl: "http://localhost:3001/api/getTripsThatUserFollow"
// }

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'
 
export const appConfig: AppConfigType = {
    registerUrl: `${apiUrl}/api/auth/register`,
    loginUrl: `${apiUrl}/api/auth/login`,
    getUserDetailsUrl: `${apiUrl}/api/auth/userDetails`,
    updateUserDetailsUrl: `${apiUrl}/api/auth/updateDetails`,
    changePasswordUrl: `${apiUrl}/api/auth/changePassword`,

    getAllVacationUrl: `${apiUrl}/api/trips`,
    getAllVacationIDUrl: `${apiUrl}/api/tripsID`,
    getOneVacationUrl: `${apiUrl}/api/trip`,
    addNewVacationUrl: `${apiUrl}/api/trips/addNewTrip`,
    updateVacationUrl: `${apiUrl}/api/updateTrip`,
    deleteVacationUrl: `${apiUrl}/api/deleteVacation`,

    getAllFollowersForAllTrip: `${apiUrl}/api/followers`,
    countAllFollowersForAllTrip: `${apiUrl}/api/countFollowers`,
    addLikeToTripUrl: `${apiUrl}/api/followers/tripId`,
    checkIfUserFollowUrl: `${apiUrl}/api/checkIfUserFollow`,
    removingFollowUrl: `${apiUrl}/api/deleteFollow`,
    getAllTripThatUserFollowUrl: `${apiUrl}/api/getTripsThatUserFollow`
}
