import axios from "axios";
import { LoginCredentialsType } from "../types/LoginCredentialsType";
import { RegisterType } from "../types/RegisterType";
import { appConfig } from "../utils/appConfig";



export const registerUser = async (user: RegisterType): Promise<string> => {

    const response = await axios.post(appConfig.registerUrl, user)

    const token = response.data

    return token
}

export const loginUser = async (credential: LoginCredentialsType) :Promise<string[]> => {
    const response = await axios.post(appConfig.loginUrl, credential)

    const token = response.data
    return token
}

export const verifyAdminService = async (credential: LoginCredentialsType) :Promise<string[]> => {
    
    const response = await axios.post(appConfig.loginUrl, credential)
    const token = response.data
    return token[1]
}

export const getUserDetails = async (userId:number): Promise<RegisterType> => {
    const response =await axios.get(appConfig.getUserDetailsUrl + `/${userId}`)

    const details = response.data as RegisterType
    return details
}

export const changePassword = async(userId: number, newPass: string): Promise<string> => {
    const response = await axios.put(appConfig.changePasswordUrl + `/${userId}`, newPass)
    console.log(response.config)
    const result = response.data
    return result
} 