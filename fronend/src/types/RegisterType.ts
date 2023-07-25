

export type RegisterType = {
    firstName: string
    lastName: string
    email: string
    password: string
}

export type NewPasswordType = {
    currentPassword: string
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

export type UserResponse = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    token: string
  }