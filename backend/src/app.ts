import express  from "express";
import expressFileUpload from 'express-fileupload';
import { appConfig } from "./2 - utils/appConfig";
import { catchAll } from "./3 - middleware/catchAll";
import { routeNotFoundMW } from "./3 - middleware/routerNotFound";

import authControllers from './6 - controllers/auth-controllers'
import tripControllers from './6 - controllers/trip-controllers'
import cors from 'cors'


const server = express()

server.use(expressFileUpload());
server.use(express.static('public')); 
server.use(express.json())
server.use(cors())

server.use("/api", tripControllers)
server.use("/api", authControllers)

server.use("*", routeNotFoundMW)
server.use(catchAll)

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`))

