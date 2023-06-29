import { executeSql } from "../2 - utils/dal";
import { getNewToken } from "../2 - utils/verifyAndCreateToken";
import { UserType, validateUser } from "../4 - models/UserModel";






export const registerUser = async (user: UserType): Promise<string> => {

    validateUser(user)

    user.role = "user"

    const token = getNewToken(user)

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