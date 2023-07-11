import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllFollowersService } from "../../Services/followersService"
import { getAllVacations } from "../../Services/tripService"
import { FollowersType } from "../../types/followerType"
import { TripType } from "../../types/TripType"
import { VacationCard } from "./vacationCard/VacationCard"

import './vacationPage.css'


export const VacationPage = () => {

  const navigate = useNavigate()

    const [trips, setTrips] = useState<TripType[]>([])
    const [allLikes, setAllLikes] = useState<FollowersType[]>([])

    const token = localStorage.getItem('Token')
    const tokenFixed = token?.replace(/["]/g, '')

    useEffect(() => {

         getAllVacations(tokenFixed)
        .then(res => setTrips(res))
        .catch((err) => {
          if(err.response.data === 'Invalid token') {
            navigate('/home')
          }
        })
    }, [trips])

  return <>
    <h1>Vacation Page</h1>
    <section className="vacationConteiner">
      {trips.map((trip, id) => (
      <VacationCard key={id} trip={trip} />))}
    </section>
  </>
}


