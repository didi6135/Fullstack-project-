import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { changePassword, getUserDetails } from "../../Services/authService"
import { getAllVacations } from "../../Services/tripService"
import { RegisterType } from "../../types/RegisterType"
import { EditTripType, TripType } from "../../types/TripType"
import { VacationCard } from "./vacationCard/VacationCard"

import './vacationPage.css'



export const VacationPage = () => {

  const navigate = useNavigate()

    const [trips, setTrips] = useState<EditTripType[]>([])

    const [details, setDetails] = useState<RegisterType>()

    const token = localStorage.getItem('Token')
    const tokenFixed = token?.replace(/["]/g, '')
    
    const role = localStorage.getItem('role')
    const roleFixed = role?.replace(/["]/g, '')


    const userID = localStorage.getItem('id')

    useEffect(() => {
         getAllVacations(tokenFixed)
        .then(res => setTrips(res))
        .catch((err) => {
          if(err.response.data === 'Invalid token') {
            navigate('/home')
          }
        })
    }, [trips])

    useEffect(() => {
      const getUserData = async() => {
        if(userID) {
          await getUserDetails(+userID)
          .then(res => {
            setDetails(res)
          })
          .catch(err => console.log(err))
        }
      }
      getUserData()
    }, [])


    const handlePrivateArea = () => {
      if(roleFixed === 'user') {
        navigate (`/privateArea/${userID}`)
      } else if(roleFixed === 'admin') {
        navigate(`/manageArea/${userID}`)
      }
    }

  return <>
    { details ? <>
    <h1>Vacation Page</h1><h3>Welcome: {details.firstName} {details.lastName}</h3>
    <Button onClick={handlePrivateArea} variant="outlined" >Private Area</Button>
    </> 
    : <h1>Loading details...</h1>}
    <br />
    <hr />
    {/* <label htmlFor="">only</label>
    <input type="checkbox" />
    <input type="checkbox" />
    <input type="checkbox" /> */}


    <section className="vacationConteiner">
      {trips.map((trip, id) => (
      <VacationCard key={id} trip={trip} />))}
    </section>
  </>
}


