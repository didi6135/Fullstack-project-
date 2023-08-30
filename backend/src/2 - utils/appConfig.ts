import { AppConfigType } from "../4 - models/AppConfigModel";



export const appConfig: AppConfigType = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: +process.env.PORT

    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'trip-for-you',
    // port: 3001

}