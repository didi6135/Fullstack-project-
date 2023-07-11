import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addLikeToTrip, getAllFollowersService } from "../../../Services/followersService"
import { FollowersType } from "../../../types/followerType"
import { TripType } from "../../../types/TripType"
import { MainButton } from "../../mainButton/MainButton"

import './vacationCard.css'

interface TripProps {
    trip: TripType
    // followers: FollowersType
}

export const VacationCard = ({trip}: TripProps) => {
    const navigate = useNavigate()

    const [imageUrl, setImageUrl] = useState('')
    const [role, setRole] = useState('')
    const [addNewLike, setAddNewLike] = useState<FollowersType>()

    const [allLikes, setAllLikes] = useState(0)

    const token = localStorage.getItem('Token')
    const id = localStorage.getItem('id')
    const tokenFixed = token?.replace(/["]/g, '')

    const [myLike, setMyLike] = useState(false)


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


    useEffect(() => {
        const getRole = () => {
           const role = localStorage.getItem('role')
           const roleFixed = role?.replace(/["]/g, '')
           if(roleFixed) {
               setRole(roleFixed)
           }
        }
        getRole()
    }, [])

    
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

    const handleLike = async () => {
        setMyLike(prev => !prev)
        setAllLikes(prevLikes => prevLikes + (myLike ? -1 : 1));
        try {
            if(token && id && myLike) {
                setAddNewLike(+id, trip.TripId)
                if(addNewLike) {
                    await addLikeToTrip(token, trip.TripId, addNewLike)
                }
            }
        } catch (error) {
            
        }
    }
    

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

        {role === "admin" ? 
        <><MainButton title="Edit" handleClick={handleEdit} />
        <MainButton title="Delete" handleClick={handleDelete} /></>
         :             
         <button 
         className={myLike ? 'like' : ''} 
         onClick={handleLike}>Like: {allLikes}</button>
         }
        </div>
    </>


}