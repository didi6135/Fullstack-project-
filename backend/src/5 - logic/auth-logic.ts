import { response } from "express";
import { OkPacket } from "mysql";
import { executeSql } from "../2 - utils/dal";
import { getNewTokenForLogin, getNewTokenForRegister } from "../2 - utils/verifyAndCreateToken";
import { verifyAdmin } from "../2 - utils/verifyRole";
import { isEmailExist, validationError } from "../4 - models/ErrorModel";
import { LoginCredentialsType, NewPasswordType, UpdateUserDetailsType, UserResponse, UserType, validateNewPassword, validateUpdateUser, validateUserLogin, validateUserRegister } from "../4 - models/UserModel";




export const checkIsEmailExist = async (email: string): Promise<object> => {

    const query = `
    SELECT COUNT(*) AS count FROM users WHERE email = ?
    `

    const queryVal = [email]
    const info = await executeSql(query, queryVal)
    return info
}


export const getIdByEmail = async(email:string): Promise<number> => {
    
    const query = ` 
    SELECT id FROM users WHERE email = ?
    `
    const queryVal = [email]

    const id = await executeSql(query, queryVal) 
    // if(id) return isEmailExist('Incorrect email or password')
    return id[0]["id"]
}




export const registerUserLogic = async (user: UserType): Promise<UserResponse> => {
   const check = await checkIsEmailExist(user.email)
   
    if(check[0].count >= 1) {
       return isEmailExist('This email already exist')
    } 

        validateUserRegister(user)
        user.role = "user"
        
        const query =  `
        INSERT INTO 
        users
        (firstName, lastName, email, password, role) 
        VALUES 
        (?, ?, ?, ?, ?);
        `
        
        const queryVal = [
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            user.role
        ]
        
        
        const info: OkPacket = await executeSql(query, queryVal)
        const id =  info.insertId
        const token = getNewTokenForRegister(user)
        const response: UserResponse = {
            id: id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: token

        }
        return response 
} 


export const LoginUserLogic = async (credentials: LoginCredentialsType): Promise<UserResponse> => {
    validateUserLogin(credentials)
    const check = await checkIsEmailExist(credentials.email)
    const id = await getIdByEmail(credentials.email)
    
    
    if(check[0].count = 0) {
        return isEmailExist('Incorrect email or password')
    } 

    
    const query = `
    SELECT email, password FROM users 
    WHERE email = ? 
    AND password = ? LIMIT 1; 
    `

    const queryVal = [credentials.email, credentials.password]

    const sql = await executeSql(query, queryVal)

    if(sql[0]) {
        const checkRole = await verifyAdmin(credentials.email)
        const token = getNewTokenForLogin(credentials)
        if(checkRole) {
            const user = await getUserDetails(id)

            const response: UserResponse = {
                id: id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: token
    
            }
            return response
        } else {
            const user = await getUserDetails(id)
            const response: UserResponse = {
                id: id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: token
    
            }
            return response
    
        }
    } else {
        return isEmailExist('Incorrect email or password') 
    } 


}


export const getUserDetails = async(userId: number): Promise<UserType> => {

    const query = `
    SELECT * FROM users WHERE id = ?
    `

    const queryVal = [userId]


    const userData = await executeSql(query, queryVal) as UserResponse
    return userData[0]

}

export const changePassword = async(userId: number, newPass: NewPasswordType): Promise<string> => {

    validateNewPassword(newPass.newPassword)

    const getCurrentPass = await getUserDetails(userId) 
    if(getCurrentPass.password === newPass.currentPassword ) {
        const query = `
        UPDATE users SET 
        password = ?
        WHERE id = ?
        `
        const queryVal = [newPass.newPassword, userId]
    
        const info: OkPacket = await executeSql(query, queryVal)
        if(info.affectedRows === 1) {
            return 'Your Password changed successfully' 
        } else if (info.affectedRows === 0) {
            return 'Your password has not been changed'
        }

    } else {
        return validationError('This is not your password')
    }
}

export const updateUserDetails = async (userId: number, userDetails: UserResponse): Promise<UserResponse | string> => {
    validateUpdateUser(userDetails)

    const query = `
    UPDATE users SET
    firstName = "${userDetails.firstName}",
    lastName = "${userDetails.lastName}",
    email = "${userDetails.email}"
    WHERE id = ${userId}
    `
    const queryVal = [
        userDetails.firstName,
        userDetails.lastName,
        userDetails.email,
        userId
        ]

    await executeSql(query, queryVal)

        const response: UserResponse = {
            id: userDetails.id,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            role: userDetails.role,
            token: userDetails.token
        
        }
        return response
}