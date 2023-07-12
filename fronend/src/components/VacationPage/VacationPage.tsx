import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { changePassword, getUserDetails } from "../../Services/authService"
import { getAllVacations } from "../../Services/tripService"
import { RegisterType } from "../../types/RegisterType"
import { TripType } from "../../types/TripType"
import { VacationCard } from "./vacationCard/VacationCard"

import './vacationPage.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

export const VacationPage = () => {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [trips, setTrips] = useState<TripType[]>([])

    const [details, setDetails] = useState<RegisterType>()

    // const [fullName, setFullName] = useState('')
    // const [email, setEmail] = useState('')

    const [currentPass, setCurrentPass] = useState('')
    const [newPass, setNewPass] = useState('')

    const token = localStorage.getItem('Token')
    const tokenFixed = token?.replace(/["]/g, '')

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
            // setFullName(res.firstName + ' ' + res.lastName)
            // setEmail(res.email)
          })
          .catch(err => console.log(err))
        }
      }
      getUserData()
    }, [])

    const handleChangeCurrentPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPass(event.currentTarget.value)
    }

    
    const handleChangeNewPass = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPass(event.currentTarget.value)
    }

    const handleChangePassword = async () => {
      if(details && userID) {
        if(details.password === currentPass){

          await changePassword(+userID, newPass)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        }
      }
    }

  return <>
    { details ? <>
    <h1>Vacation Page</h1><h3>Welcome: {details.firstName} {details.lastName}</h3>
    <h3>Email: {details.email}</h3><div>
      <Button onClick={handleOpen}>Change your password</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography mb={5}>Change your password:</Typography>
          <TextField
            onChange={handleChangeCurrentPass}
            sx={{ marginBottom: '20px', width: '65%' }}
            id="outlined-basic"
            label="Set your current password:"
            variant="outlined" />

          <TextField
            onChange={handleChangeNewPass}
            sx={{ marginBottom: '20px', width: '65%' }}
            id="outlined-basic"
            label="Set a new password:"
            variant="outlined" />

          <Button onClick={handleChangePassword}>Change Password</Button>
        </Box>
      </Modal>
    </div></> 
    : <h1>Loading details...</h1>}

    <section className="vacationConteiner">
      {trips.map((trip, id) => (
      <VacationCard key={id} trip={trip} />))}
    </section>
  </>
}


