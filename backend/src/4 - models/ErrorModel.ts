

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