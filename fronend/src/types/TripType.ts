

export type TripType = {
    TripId: number,
    destination: string,
    tripDescription: string,
    dateStart: string,
    dateEnd: string,
    price: number,
    imageFile: File | null,
    imageName: string | undefined

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