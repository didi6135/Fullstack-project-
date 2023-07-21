

export type RegisterType = {
    firstName: string
    lastName: string
    email: string
    password: string
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
