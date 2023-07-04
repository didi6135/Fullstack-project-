import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllVacations } from "../../Services/tripService"
import { TripType } from "../../types/TripType"
import { VacationCard } from "./VacationCard"


export const VacationPage = () => {

  const navigate = useNavigate()

    const [trips, setTrips] = useState<TripType[]>([])

    useEffect(() => {

      const token = localStorage.getItem('Token')
      const tokenFixed = token?.replace(/["]/g, '')

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
    {trips.map((trip, id) => (
    <VacationCard key={id} trip={trip} />))}
  </>
}


