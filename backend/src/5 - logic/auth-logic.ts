import { response } from "express";
import { OkPacket } from "mysql";
import { executeSql } from "../2 - utils/dal";
import { getNewTokenForLogin, getNewTokenForRegister } from "../2 - utils/verifyAndCreateToken";
import { verifyAdmin } from "../2 - utils/verifyRole";
import { isEmailExist, validationError } from "../4 - models/ErrorModel";
import { LoginCredentialsType, NewPasswordType, UpdateUserDetailsType, UserResponse, UserType, validateNewPassword, validateUpdateUser, validateUserLogin, validateUserRegister } from "../4 - models/UserModel";




export const checkIsEmailExist = async (email: string): Promise<object> => {

    const query = `
    SELECT COUNT(*) AS count FROM users WHERE email = '${email}'
    `
    const info = await executeSql(query)
    return info
}

export const getIdByEmail = async(email:string): Promise<number> => {
    const query = `
    SELECT id FROM users WHERE email = "${email}"
    `
    const id = await executeSql(query)

    return id[0]["id"]
}




export const registerUserLogic = async (user: UserType): Promise<UserResponse> => {
   const check = await checkIsEmailExist(user.email)
   
    if(check[0].count >= 1) {
       return isEmailExist('This email already exist')
    } 

        validateUserRegister(user)
        user.role = "user"
        const token = getNewTokenForRegister(user)
    
        const query =  `
        INSERT INTO 
        users
        (firstName, lastName, email, password, role) 
        VALUES 
        ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.password}', '${user.role}');
        `
    
        const info: OkPacket = await executeSql(query)
        const id =  info.insertId
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

    const check = await checkIsEmailExist(credentials.email)

    const id = await getIdByEmail(credentials.email)
    
    if(check[0].count = 0) {
        return isEmailExist('Incorrect email or password')
     } 
    validateUserLogin(credentials)

    const token = getNewTokenForLogin(credentials)

    const query = `
    SELECT email, password FROM users 
    WHERE email = '${credentials.email}' 
    AND password = '${credentials.password}' LIMIT 1; 
    `
    const sql = await executeSql(query)

    if(sql[0]) {
        const checkRole = await verifyAdmin(credentials.email)
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
    SELECT * FROM users WHERE id = ${userId}
    `

    const userData = await executeSql(query) as UserResponse
    return userData[0]

}

export const changePassword = async(userId: number, newPass: NewPasswordType): Promise<string> => {

    validateNewPassword(newPass.newPassword)

    const getCurrentPass = await getUserDetails(userId) 
    console.log(getCurrentPass.password)
    if(getCurrentPass.password === newPass.currentPassword ) {
        const query = `
        UPDATE users SET 
        password = "${newPass.newPassword}"
        WHERE id = ${userId}
        `
    
        const info: OkPacket = await executeSql(query)
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

    await executeSql(query)

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