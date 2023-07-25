import { useEffect, useState } from "react"
import { useAppSelector } from "../../../app/hooks"
import { getTripsThatUserFollowService } from "../../../Services/followersService"
import { EditTripType } from "../../../types/TripType"
import { VacationCard } from "../../VacationPage/vacationCard/VacationCard"

import './followVacation.css'

export const FollowVacation = () => {
  
    // const userID = localStorage.getItem('id')

    const selector = useAppSelector(state => state.user.user)

    // const [userTripId, setUserTripId] = useState<number[]>([])

    const [trips, setTrips] = useState<EditTripType[]>([])
    const[checkUserFollow, setCheckUserFollow] = useState(false)


    useEffect(() => {
      const getAll = async() => {
        if(selector) {
          const res = await getTripsThatUserFollowService(selector.id)
          if(res.length === 0) {
            setCheckUserFollow(false)
          } else if(res) {
            console.log(res)
            setCheckUserFollow(true)
            setTrips(res)
          }
        }
      }
      console.log('e')
      getAll() 
    }, [selector?.id])
  

  return <>
    {checkUserFollow ? 
    <section className="followContainer">
    {trips.map((trip, id) => (
      <VacationCard key={id} trip={trip} />))}
    </section>
      :
    <h1>You have no trips follow</h1>}
  </>
}

