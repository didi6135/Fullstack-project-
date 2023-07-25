import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addLikeToTrip, checkingFollow, getAllFollowersService, removingFollowFromTrip } from "../../../Services/followersService"
import { FollowersType } from "../../../types/followerType"
import { EditTripType, TripType } from "../../../types/TripType"
import { MainButton } from "../../mainButton/MainButton"

import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './vacationCard.css'
import { useAppSelector } from "../../../app/hooks"
import { UserResponse } from "../../../types/RegisterType"

interface TripProps {
    trip: EditTripType
}

export const VacationCard = ({trip}: TripProps) => {
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
    }, [])

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
    }, [trip.TripId, selector?.id])


    
    useEffect(() => {
        const getfollowers = async() => {
          if(selector) {
            await getAllFollowersService(selector.token, trip.TripId)
            .then(likes => setAllLikes(likes))
            .catch(err => console.log(err))
          }
        }
        getfollowers()
  
    }, [])


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
            // setAddNewLike(prev => ({...prev, userId: +userID, TripId: trip.TripId}))
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

    
    const handleDelete = () => {

    }

    const handleEdit = () => {        
        navigate(`/editVacation/${trip.TripId}`)

    }
    return <>
        <div className="tripCard"> 
            <img className="tripImage" src={imageUrl} alt="" />
        
        {/* <div className="tripDetails"> */}
            <h2 className="tripDestination">{trip.destination}</h2>
            <p className="tripDescription">{trip.tripDescription}</p>
            <h4 className="tripDateStart">{trip.dateStart.slice(0, 10)}</h4>
            <h4 className="tripDAteEnd">{trip.dateEnd.slice(0, 10)}</h4>
            <h4 className="tripPrice">$ {trip.price}</h4>
        {/* </div> */}

        {selector?.role === "admin" ? 
        <><MainButton title="Edit" handleClick={handleEdit} />
        <MainButton title="Delete" handleClick={handleDelete} /></>
         :             
         <button 
         className={myLike ? 'like' : 'disLike'} 
         
         onClick={handleMyLike}>
          {myLike ? <FavoriteOutlinedIcon fontSize="small"/>: <FavoriteBorderOutlinedIcon fontSize="small"/> } 
          &nbsp; Like: {allLikes}</button>
         }
        </div>
    </>

}
