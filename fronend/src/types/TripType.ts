

export type TripType = {
    tripId: number,
    destination: string,
    tripDescription: string,
    dateStart: string,
    dateEnd: string,
    price: number,
    imageFile: File | null,
    imageName: string | undefined

}