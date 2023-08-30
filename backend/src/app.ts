import express  from "express";
import expressFileUpload from 'express-fileupload';
import { appConfig } from "./2 - utils/appConfig";
import { catchAll } from "./3 - middleware/catchAll";
import { routeNotFoundMW } from "./3 - middleware/routerNotFound";

import authControllers from './6 - controllers/auth-controllers'
import tripControllers from './6 - controllers/trip-controllers'
import followersControllers from './6 - controllers/followers-controllers'
import cors from 'cors'
import path from "path";
import { sanitize } from "./3 - middleware/sanetize";


const server = express() 

server.use(expressFileUpload());
server.use(express.json())

const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200,
    credentials: true, 
}
server.use(cors(corsOptions))

const imageFolderPath = path.join(__dirname, '1 - Assets', 'images')
server.use(express.static(imageFolderPath)); 

server.use(sanitize)

server.use("/api", tripControllers)
server.use("/api", authControllers)
server.use("/api", followersControllers)

server.use("*", routeNotFoundMW)
server.use(catchAll)

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`))

