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


const server = express() 

server.use(expressFileUpload());
server.use(express.json())
server.use(cors())

const imageFolderPath = path.join(__dirname, '1 - Assets', 'images')
server.use(express.static(imageFolderPath)); 

server.use("/api", tripControllers)
server.use("/api", authControllers)
server.use("/api", followersControllers)

server.use("*", routeNotFoundMW)
server.use(catchAll)

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`))

