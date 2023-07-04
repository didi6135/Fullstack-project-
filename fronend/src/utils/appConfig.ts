import { AppConfigType } from "../types/AppConfigTypes";


export const appConfig: AppConfigType = {
    registerUrl: "http://localhost:3001/api/auth/register",
    loginUrl: "http://localhost:3001/api/auth/login",
    getAllVacationUrl: "http://localhost:3001/api/trips",
    getOneVacationUrl: "",
    addNewVacationUrl: "http://localhost:3001/api/trips/addNewTrip"
}