import { executeSql } from "../2 - utils/dal";
import { getNewTokenForLogin, getNewTokenForRegister } from "../2 - utils/verifyAndCreateToken";
import { isEmailExist } from "../4 - models/ErrorModel";
import { LoginCredentialsType, UserType, validateUserLogin, validateUserRegister } from "../4 - models/UserModel";




export const checkIsEmailExist = async (email: string): Promise<object> => {

    const query = `
    SELECT COUNT(*) AS count FROM users WHERE email = '${email}'
    `
    const info = await executeSql(query)
    return info
}


export const registerUserLogic = async (user: UserType): Promise<string> => {
   const check = await checkIsEmailExist(user.email)
   console.log(check[0].count);
   
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
    
        await executeSql(query)
        return token 
} 


export const LoginUserLogic = async (credentials: LoginCredentialsType): Promise<string> => {

    const check = await checkIsEmailExist(credentials.email)
    
    
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
        return token ;
    } else {
        return isEmailExist('Incorrect email or password') 
    } 

}