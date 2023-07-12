import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addLikeToTrip, checkingFollow, getAllFollowersService, removingFollowFromTrip } from "../../../Services/followersService"
import { FollowersType } from "../../../types/followerType"
import { TripType } from "../../../types/TripType"
import { MainButton } from "../../mainButton/MainButton"

import './vacationCard.css'

interface TripProps {
    trip: TripType
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

    // const handleLike = async () => {

    //     try {
    //         setAllLikes(prevLikes => prevLikes + (myLike ? 1 : -1));
    //         if(tokenFixed && userID) {
    //             setAddNewLike(prev => ({...prev, userId: +userID, TripId: trip.TripId}))

    //             if(addNewLike) {
    //                 console.log(addNewLike)
    //                 await addLikeToTrip(tokenFixed, trip.TripId, addNewLike)
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }
    
    const handleDelete = () => {

    }

    const handleEdit = () => {        
        navigate(`/editVacation/${trip.TripId}`)

    }
    return <>
        <div className="tripCard">
            <img width={300} src={imageUrl} alt="" />
            <h2>{trip.destination}</h2>
            <br/>
            <p className="description">{trip.tripDescription}</p>
            <br/>
            <h4>{trip.dateStart.slice(0, 10)}</h4>
            <br/>
            <h4>{trip.dateEnd.slice(0, 10)}</h4>
            <br/>
            <h4>{trip.price}</h4>

        {roleFixed === "admin" ? 
        <><MainButton title="Edit" handleClick={handleEdit} />
        <MainButton title="Delete" handleClick={handleDelete} /></>
         :             
         <button 
         className={myLike ? 'like' : ''} 
         onClick={handleMyLike}>Like: {allLikes}</button>
         }
        </div>
    </>


}


// 1. יצירת כפתור שיש אפשרות לעשות לייק לטיול///////
// 2. עם עשו לייק שיהיה בצבע אדום ושלא תהיה אפשרות לעשות עוד לייק אלא רק להוריד את הלייק
// 3. להציג למשתמש בטעינת הדף איזה טיולים הוא כבר עשה להם לייק
// 4. להציג על כל טיול כמה לייקים יש אותו טיול