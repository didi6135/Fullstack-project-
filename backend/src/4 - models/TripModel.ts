import Joi from "joi"
import { UploadedFile } from "express-fileupload"
import { tripValidateError } from "./ErrorModel"
import moment from 'moment';




export type TripType = {
    TripId: number,
    destination: string,
    tripDescription: string,
    dateStart: Date,
    dateEnd: Date,
    price: number,
    imageFile: UploadedFile,
    imageName: string
}

export type EditTripType = {
    TripId: number,
    destination: string,
    tripDescription: string,
    dateStart: string,
    dateEnd: string,
    price: number,
    imageName: string
}

export const TripValidationSchema = Joi.object({
    TripId: Joi.number().optional(),
    destination: Joi.string().required().min(1).max(20),
    tripDescription: Joi.string().required().min(20).max(200),
    dateStart: Joi.date().iso().min(moment().format('YYYY-MM-DD')).required() ,
    dateEnd:  Joi.date().iso().min(Joi.ref('dateStart')).required(),
    price: Joi.number().required().positive().min(1).max(10000),
    imageFile: Joi.object().optional(),
    imageName: Joi.string().optional(),
})


export const validateTrip = (trip: TripType) => {
    const result = TripValidationSchema.validate(trip)
    if(result.error) tripValidateError(result.error.message)
}

// export const validateEditTrip = (trip: EditTripType) => {
//     const result = TripValidationSchema.validate(trip)
//     if(result.error) tripValidateError(result.error.message)
// }