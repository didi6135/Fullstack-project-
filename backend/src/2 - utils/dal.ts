import mysql from 'mysql'
import { appConfig } from './appConfig';

// Get all data from SQL

const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database
})

// execute SQL query 
export const executeSql = (query: string): Promise<any> => {
    return new Promise<any>((res, rej) => {
        
        connection.query(query, (err, result) => {
            if(err) {
                rej(err)
                return 
            }
            res(result)
        })
    })
}