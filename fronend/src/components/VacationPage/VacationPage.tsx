import { Button, IconButton, Menu, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { getAllVacations } from "../../Services/tripService"
import { EditTripType } from "../../types/TripType"
import { VacationCard } from "./vacationCard/VacationCard"

import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import './vacationPage.css'
import Checkbox from '@mui/material/Checkbox';
import { getTripsThatUserFollowService } from "../../Services/followersService"
import { AddNewTrip } from "../TripArea/addNewTrip/AddNewTrip"



export const VacationPage = () => {

  const navigate = useNavigate()

    const [trips, setTrips] = useState<EditTripType[]>([])
    const selector = useAppSelector(state => state.user.user)

    const getAllVacationForStart = () => {
      if(selector) {
        getAllVacations(selector.token)
        .then(res => setTrips(res))
        .catch((err) => {
          if(err.response.data === 'Invalid token') {
            navigate('/home')
          }
        })
      }
    }
    useEffect(() => {
      getAllVacationForStart()
    }, [])

    // useEffect(() => {
    //   const getUserData = async() => {
    //     if(selector) {
    //       await getUserDetails(selector.id)
    //       .then(res => {
    //         setDetails(res)
    //       })
    //       .catch(err => console.log(err))
    //     }
    //   }
    //   getUserData()
    // }, [])

    const [myTrip, setMyTrip] = useState(false)
    const [tripNotStart, setTripNotStart] = useState(false)
    const [tripStart, setTripStart] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMyTripFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMyTrip(event.target.checked)
    }

    const handleTripThatNotStartFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTripNotStart(event.target.checked)
    }

    const handleActiveTripFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTripStart(event.target.checked)
    }

    const handleFilter = async () => {
      setAnchorEl(null)
      if(selector) {
        if(!myTrip && !tripNotStart && !tripStart) {
          getAllVacations(selector.token)
          .then(res => setTrips(res))
          .catch(err => console.log(err))
        }

        if(myTrip) {
          getAllVacationForStart()
          await getTripsThatUserFollowService(selector.id)
          .then(res => {
            // setTrips([])
            
            setTrips(res)
            })
            .catch(err => console.log(err))
          }

          if(tripNotStart) {
            getAllVacationForStart(   )
             const filteredTrips = trips.filter((trip) => {
               const tripDate = new Date(trip.dateStart).toLocaleDateString()
               const date = new Date().toLocaleDateString()
               
               return date < tripDate
             })

            setTrips(filteredTrips);
          }

          if(tripStart) {
            const filteredTrips = trips.filter((trip) => {
              const tripDate = new Date(trip.dateStart).toLocaleDateString()
              const date = new Date().toLocaleDateString()
              return date > tripDate
            })
            setTrips(filteredTrips);
          }
        }
    }
  



    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return <>
    {selector?.role === 'user' && 
    <nav className="navTripsPage">
      <IconButton onClick={handleMenu}>
        <FilterListOutlinedIcon fontSize="large" color="primary"/>
      </IconButton>
        <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem><Checkbox onChange={handleMyTripFilter} checked={myTrip} />&nbsp; My trip </MenuItem>
                <MenuItem><Checkbox onChange={handleTripThatNotStartFilter} checked={tripNotStart}/>&nbsp; Trips that haven't started </MenuItem>
                <MenuItem><Checkbox onChange={handleActiveTripFilter} checked={tripStart}/>&nbsp; Active trips </MenuItem>
                <Button onClick={handleFilter}>Filter</Button>
        </Menu>
    </nav>}
    {selector?.role === 'admin' &&
    <AddNewTrip/>
    }
    <section className="vacationConteiner">
      {trips.map((trip, id) => (
      <VacationCard key={id} trip={trip} />))}
    </section>
  </>
}


