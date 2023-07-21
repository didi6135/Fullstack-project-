import Joi from 'joi'
import { isEmailExist, validationError } from './ErrorModel'


export type RuleType = "admin" | "user"

export type LoginCredentialsType = {
    email: string
    password: string
}

export type UserType = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
}

export type NewPasswordType = {
  newPassword: string
}

export type UpdateUserDetailsType = {
  firstName: string,
  lastName: string,
  email: string
}

export type UserTripType = {
  userId: number;
  tripId: number;
};




export const passwordValidation = Joi
  .string()
  .min(8)
  .max(30)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/)
  .required()
  .messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password con\'t be empty.',
    'string.min': 'Password must be at least {#limit} characters long.',
    'string.max': 'Password cannot exceed {#limit} characters.',
    'string.pattern.base': 'Password must contain at least: \n 1 lowercase letter, \n 1 uppercase letter,\n 1 number,\n 1 one special character.',
  });

  const firstNameValidation = Joi.string().required().min(2).max(25)
  .messages({
  'string.empty': 'First name con\'t be empty.',
  'string.min':'First name must be at least 2 characters',
  'string.max': 'First name is large then 25 characters'
})

const lastNameValidation = Joi.string().required().min(2).max(25)
  .messages({
  'string.empty': 'Last name con\'t be empty.',
  'string.min':'Last name must be at least 2 characters',
  'string.max': 'Last name is large then 25 characters'
})

export const mailValidation = Joi.string().email({ minDomainSegments: 2, tlds: false })
.messages({
  'string.email':'Email address is invalid',
  'string.empty': 'Email con\'t be empty.'
})


export const loginCredentialsSchema = Joi.object({
    email: mailValidation,
    password: passwordValidation
})


export const registerUserValidateSchema = Joi.object({
    id: Joi.string().optional() ,
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    email: mailValidation,
    password: passwordValidation,
    role: Joi.string() ,
})

export const newPasswordSchema = Joi.object({
  newPassword: passwordValidation
})

export const updateUserDetailsSchema = Joi.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: mailValidation
})

export const validateUserRegister = (user: UserType) => {
  const result = registerUserValidateSchema.validate(user)
  if(result.error) {
      validationError(result.error.message)
  }
}

export const validateUserLogin = (credentials: LoginCredentialsType) => {
  const result = loginCredentialsSchema.validate(credentials)
  if(result.error) {
      validationError(result.error.message)
  }
}

export const validateNewPassword = (newPass: NewPasswordType) => {
  const result = newPasswordSchema.validate(newPass)
  if(result.error) {
    validationError(result.error.message)
  }
}

export const validateUpdateUser = (userDetails: UpdateUserDetailsType) => {
  const result = updateUserDetailsSchema.validate(userDetails)
  if(result.error) {
    validationError(result.error.message)
  }
}








