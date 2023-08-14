import { Box, Button, IconButton, Menu, MenuItem, Pagination, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { deleteVacationService, getAllVacations } from "../../Services/tripService"
import { EditTripType } from "../../types/TripType"
import { VacationCard } from "./vacationCard/VacationCard"

import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import './vacationPage.css'
import Checkbox from '@mui/material/Checkbox';
import { getTripsThatUserFollowService } from "../../Services/followersService"
import { AddNewTrip } from "../TripArea/addNewTrip/AddNewTrip"



export const VacationPage = () => {

  const navigate = useNavigate()

  const [myTrip, setMyTrip] = useState(false)
  const [tripNotStart, setTripNotStart] = useState(false)
  const [tripStart, setTripStart] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [trips, setTrips] = useState<EditTripType[]>([])
    const [filteredTrips, setFilteredTrips] = useState<EditTripType[]>([]);

    const [filterName, setFilterName] = useState('')
    const selector = useAppSelector(state => state.user.user)


    useEffect(() => {
         if(selector) {
        getAllVacations(selector.token)
        .then(res => {
          setTrips(res)
          setFilteredTrips(res)

        })
        .catch((err) => {
          if(err.response.data === 'Invalid token') {
            navigate('/home')
          }
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trips]);


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
      setAnchorEl(null);
      if (selector) {
        if (!myTrip && !tripNotStart && !tripStart) {
          setFilterName('')
          setFilteredTrips(trips);
        }
  
        if (myTrip) {
          await getTripsThatUserFollowService(selector.id)
            .then((res) => {
              setFilteredTrips(res)
              setFilterName('Sort by: My trip')
              // setTripNotStart(false)
              // setTripStart(false)
            })
            .catch((err) => console.log(err));
        }
  
        if (tripNotStart) {
          const date = new Date();
          const filteredTrips = trips.filter((trip) => {
            const tripDate = new Date(trip.dateStart);
            return date < tripDate;
          });

          setFilterName('Sort by: Trip Not Start')
          setFilteredTrips(filteredTrips);
        }
  
        if (tripStart) {
          const filteredTrips = trips.filter((trip) => {
            const tripStartDate = new Date(trip.dateStart);
            const tripEndDate = new Date(trip.dateEnd);
            const currentDate = new Date();
            return currentDate >= tripStartDate && currentDate <= tripEndDate;
          });
          // setMyTrip(false)
          // setTripNotStart(false)
          setFilterName('Sort by: Trip Start')
          setFilteredTrips(filteredTrips);
        }
      }
    };
  

    const handleDeleteTrip = async (tripId: number) => {
      try {
        if(selector) {
          await deleteVacationService(tripId, selector.token);
          
            setTrips((prevTrips) => prevTrips.filter((trip) => trip.TripId !== tripId));

          // console.log('Trip deleted successfully.');
        }
      } catch (error) {
        console.log(error)
      }
    };



    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 
    const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);

    const handlePageChange = ( page: number) => {
      setCurrentPage(page);
    };

    

  return <>
    {selector?.role === 'user' && 
    
    <nav className="navTripsPage">
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          
          <Typography sx={{fontSize: '18px', color: 'white'}}>{filterName}</Typography>
          
        </Box>
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

        
    </nav>
    }
    {selector?.role === 'admin' &&
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px'
    }}>
      <AddNewTrip/>
    </Box>
    }
   <section className="vacationContainer">
        {filteredTrips.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((trip) => (
            <VacationCard key={trip.TripId} trip={trip} onDeleteTrip={handleDeleteTrip} />
          ))}
      </section>
      <div className="pagination">
        <Pagination
        
          color="primary"
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
        />
      </div>

  </>
}





