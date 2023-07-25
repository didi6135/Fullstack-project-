import axios from "axios";
import { LoginCredentialsType } from "../types/LoginCredentialsType";
import { NewPasswordType, RegisterType, UpdateUserDetailsType, UserResponse } from "../types/RegisterType";
import { appConfig } from "../utils/appConfig";



export const registerUser = async (user: RegisterType): Promise<UserResponse> => {

    const response = await axios.post(appConfig.registerUrl, user)
    const userDetails = response.data as UserResponse
    return userDetails
}



export const loginUser = async (credential: LoginCredentialsType) :Promise<UserResponse> => {
    const response = await axios.post(appConfig.loginUrl, credential)
    const userDetails = response.data as UserResponse
    return userDetails

    
}

// export const verifyAdminService = async (credential: LoginCredentialsType) :Promise<string[]> => {
    
//     const response = await axios.post(appConfig.loginUrl, credential)
//     const token = response.data
//     return token[1]
// }

export const getUserDetails = async (userId:number): Promise<RegisterType> => {
    const response =await axios.get(appConfig.getUserDetailsUrl + `/${userId}`)

    const details = response.data as RegisterType
    return details
}

export const changePassword = async(userId: number, newPass: NewPasswordType): Promise<string> => {
    const response = await axios.put(appConfig.changePasswordUrl + `/${userId}`, newPass)

    const result = response.data
    return result
} 

export const updateDetailsService = async (userId: number, userDetails: UserResponse): Promise<UserResponse> => {
    
    const response = await axios.put(appConfig.updateUserDetailsUrl + `/${userId}`, userDetails)

    const info = response.data
    return info
}