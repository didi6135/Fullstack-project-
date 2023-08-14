import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addLikeToTrip, checkingFollow, getAllFollowersService, removingFollowFromTrip } from "../../../Services/followersService"
import { EditTripType } from "../../../types/TripType"
import { MainButton } from "../../mainButton/MainButton"

import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './vacationCard.css'
import { useAppSelector } from "../../../app/hooks"
import { UserResponse } from "../../../types/RegisterType"
import { Box } from "@mui/material"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

interface TripProps {
    trip: EditTripType,
    onDeleteTrip : (arg0: number) => void
}

export const VacationCard = ({trip, onDeleteTrip}: TripProps) => {
    const navigate = useNavigate()
    
    const [imageUrl, setImageUrl] = useState('')

    const [allLikes, setAllLikes] = useState(0)
    const [myLike, setMyLike] = useState(false)


    const selector = useAppSelector(state => state.user.user) as UserResponse

// Get the image from node
    useEffect(() => {
        const getImageUrl = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/image/${trip.imageName}`)
                if(response.config.url) {
                    setImageUrl(response.config.url)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getImageUrl()
    }, [trip])

// Get the trip the user is follow
    useEffect(() => {
        const checkIfUserFollow = async () => {
            if(selector && trip.TripId) {
                await checkingFollow(selector.id, trip.TripId)
                .then(res => {if(res) setMyLike(true)})
                .catch(err => console.log(err))
            }
        }
        checkIfUserFollow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trip.TripId, selector.id])


    
    useEffect(() => {
        const getFollowers = async() => {
          if(selector) {
            await getAllFollowersService(selector.token, trip.TripId)
            .then(likes => setAllLikes(likes))
            .catch(err => console.log(err))
          }
        }
        getFollowers()
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trip.TripId])


    const handleMyLike = async () => {
        if(myLike && selector && trip.TripId) {
                await removingFollowFromTrip(selector.id, trip.TripId)
                .then(res => {
                    if(res) {
                        setAllLikes(prevLikes => prevLikes + (myLike ? -1 : 1));
                        setMyLike(false)
                    }
                })
                .catch(err => console.log(err))
        } else if (!myLike && selector && trip.TripId) {
            await addLikeToTrip(selector.token, selector.id, trip.TripId)
            .then(res => {
                if(res) {
                    setAllLikes(prevLikes => prevLikes + (myLike ? -1 : 1));
                    setMyLike(true)
                }
            })
            .catch(err => console.log(err))

        }
}

const handleDelete = async () => {
    const shouldDelete = window.confirm('Are you sure you want to delete this trip?');
  
    if (shouldDelete) {
       const deleteTrip = onDeleteTrip(trip.TripId)
       toast('Trip deleted: ' + trip.TripId);
       
    } else  {
        toast.info(`Trip: ${trip.TripId}, Deletion canceled.`)
    }
  };


    const handleEdit = () => {        
        navigate(`/editVacation/${trip.TripId}`)
    }

    return <>

        <div className="tripCard"> 
            <img className="tripImage" src={imageUrl} alt="" />
        
            <h2 className="tripDestination">{trip.destination}</h2>
            <p className="tripDescription">{trip.tripDescription}</p>
            <h4 className="tripDateStart">{new Date(trip.dateStart).toLocaleDateString()}</h4>
            <h4 className="tripDAteEnd">{new Date(trip.dateEnd).toLocaleDateString()}</h4>
            <h4 className="tripPrice">$ {trip.price}</h4>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
        }}>
            {selector?.role === "admin" ? 

            <>
            <MainButton title="Edit" handleClick={handleEdit} />
            <MainButton title="Delete" handleClick={handleDelete} />
            </>
             :             
             <button 
             className={myLike ? 'like' : 'disLike'} 

             onClick={handleMyLike}>
              {myLike ? 
              <FavoriteOutlinedIcon fontSize="small"/>
              : 
              <FavoriteBorderOutlinedIcon fontSize="small"/> } 

              &nbsp; Like: {allLikes}</button>
             }
        </Box>

        </div>
    </>
}
