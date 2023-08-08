import { executeSql } from './dal';


export const verifyAdmin = async (email: string) => {


    const query = `
    SELECT role 
    FROM users 
    WHERE email = ?
    `

    const queryVal = [email]
    const sql = await executeSql(query, queryVal)
    
    return sql[0].role === 'admin'
}