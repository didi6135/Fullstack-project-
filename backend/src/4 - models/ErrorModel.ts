

export type ErrorType = {
    message: string
    status: number
}

export const RouterNotFoundError = (msg: string) => {
    const errorObj: ErrorType = {message: `Router ${msg} not found`, status: 404}
    throw errorObj
}

export const validationError = (msg: string) => {
    const errorObj: ErrorType = {message: msg, status: 401}
    throw errorObj
}

export const tripValidateError = (msg: string) => {
    const errorObj: ErrorType = {message: msg, status: 401}
    throw errorObj
}

export const isEmailExist = (msg: string) => {
    const errorObj: ErrorType = {message: msg, status: 401}
    throw errorObj
}

export const isFollowerThisTrip = (msg: string) => {
    const errorObj: ErrorType = {message: msg, status: 401}
    throw errorObj
}

export const UnauthorizedError = (msg: string) => {
    const errorObj: ErrorType = {message: msg, status: 401}
    throw errorObj
}

export const resourceNotFound = (resource: number) => {
    const error: ErrorType = {message: `can't find any resource with input ${resource}`, status: 404}
    throw error;
}