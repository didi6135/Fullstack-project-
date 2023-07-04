import { TripType } from "../../types/TripType"
import { MainButton } from "../mainButton/MainButton"

import './vacationCard.css'

interface TripProps {
    trip: TripType
}

export const VacationCard = ({trip}: TripProps) => {

    const handleDelete = () => {

    }

    const handleEdit = () => {

    }

    console.log(trip.dateEnd)

    return <>
        <div className="tripCard">
            {/* <img src={trip.imageName} alt="" /> */}
            <h2>{trip.destination}</h2>
            <br/>
            <p className="description">{trip.tripDescription}</p>
            <br/>
            <h4>{trip.dateStart.slice(0, 10)}</h4>
            <br/>
            <h4>{trip.dateEnd.slice(0, 10)}</h4>
            <br/>
            <h4>{trip.price}</h4>

        <MainButton title="Edit" handleClick={handleEdit}/>
        <MainButton title="Delete" handleClick={handleDelete}/>
        </div>
    </>


}