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

interface TripProps {
    trip: EditTripType
}

export const VacationCard = ({trip}: TripProps) => {
    const navigate = useNavigate()

    const [imageUrl, setImageUrl] = useState('')

    const [addNewLike, setAddNewLike] = useState<FollowersType>({
        userId: 0, TripId: 0
    })

    const [allLikes, setAllLikes] = useState(0)
    const [myLike, setMyLike] = useState(false)

// Get the token from local storage 
    const token = localStorage.getItem('Token')
    const tokenFixed = token?.replace(/["]/g, '')
    
// Get the role from local storage
    const role = localStorage.getItem('role')
    const roleFixed = role?.replace(/["]/g, '')
  
// Get the user ID from local storage
    const userID = localStorage.getItem('id')



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
            if(userID && trip.TripId) {
                await checkingFollow(+userID, trip.TripId)
                .then(res => {if(res) setMyLike(true)})
                .catch(err => console.log(err))
            }
        }
        checkIfUserFollow()
    }, [trip.TripId, userID])


    
    useEffect(() => {
        const getfollowers = async() => {
          if(tokenFixed) {
            await getAllFollowersService(tokenFixed, trip.TripId)
            .then(likes => setAllLikes(likes))
            .catch(err => console.log(err))
          }
        }
        getfollowers()
  
    }, [])


    const handleMyLike = async () => {
        if(myLike && userID && trip.TripId) {
                await removingFollowFromTrip(+userID, trip.TripId)
                .then(res => {
                    if(res) {
                        setAllLikes(prevLikes => prevLikes + (myLike ? -1 : 1));
                        setMyLike(false)
                    }
                })
                .catch(err => console.log(err))
        } else if (!myLike && userID && trip.TripId && tokenFixed) {
            // setAddNewLike(prev => ({...prev, userId: +userID, TripId: trip.TripId}))
            await addLikeToTrip(tokenFixed, +userID, trip.TripId)
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

        {roleFixed === "admin" ? 
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
