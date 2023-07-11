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

// export const checkToken = async (token:string): Promise<string> => {

// }