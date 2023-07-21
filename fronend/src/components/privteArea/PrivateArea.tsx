import React, { useEffect, useState } from "react"
import { changePassword, getUserDetails, updateDetailsService } from "../../Services/authService"
import { NewPasswordType, RegisterType, UpdateUserDetailsType } from "../../types/RegisterType"

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Box, Modal, Button, TextField, Typography, IconButton } from "@mui/material";

// import Button from '@mui/material-next/Button';

import './privateArea.css'
import { FollowVacation } from "./followVacation/FollowVacation";
import { getTripsThatUserFollowService } from "../../Services/followersService";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  
};

// interface UserDataProps {
//   firstName: string
//   lastName: string
//   email: string
// }


export const PrivateArea = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false)
      setErrorDetailsMsg('')
    };

    const [details, setDetails] = useState<RegisterType>()

    const [newDetails, setNewDetails] = useState<UpdateUserDetailsType>({
      firstName: '',
      lastName: '',
      email: ''
        })

    const [currentPass, setCurrentPass] = useState('')
    const [newPass, setNewPass] = useState<NewPasswordType>()

    const [errorPassMsg, setErrorPassMsg] = useState('')
    const [errorDetailsMsg, setErrorDetailsMsg] = useState('')

    const [successPass, setSuccessPass] = useState('')
    const [successDetail, setSuccessDetail] = useState('')

    const token = localStorage.getItem('Token')
    const tokenFixed = token?.replace(/["]/g, '')


    const userID = localStorage.getItem('id')
    
    useEffect(() => {
        const getUserData = async() => {
          if(userID) {
            await getUserDetails(+userID)
            .then((detail) => {
              setDetails(detail)
              setNewDetails({
                firstName: detail.firstName,
                lastName: detail.lastName,
                email: detail.email,
              })
            })
            .catch(err => console.log(err))
          }
        }
        getUserData()
      }, [userID, open])

      // useEffect(() => {
      //   const getTripsID = async() => {  
      //     try {
      //       if(userID) {
      //         const res = await getTripsThatUserFollowService(+userID);
      //         if(res) {
      //           setCheckUserFollow(true)
      //         }
      //       }
      //     } catch (error) {
      //       console.log(error)
      //     }
      //   }
      //   getTripsID()
      // }, [])
  
      const handleChangeCurrentPass = (event: React.ChangeEvent<HTMLInputElement>) => {
          setCurrentPass(event.currentTarget.value)
      }
  
      const handleChangeNewPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPass(prev => ({...prev, newPassword: event.currentTarget.value}))
      }
  
      const handleChangePassword = async () => {
        if(details && userID) {
          if(details.password === currentPass && newPass){
  
            await changePassword(+userID, newPass)
            .then(res => {
                setSuccessPass(res)
                setTimeout(() => {
                  handleClose()
                  setSuccessPass('')
                }, 1500);
            })
            .catch(err => setErrorPassMsg(prev => prev = err.response.data))
          }
        }
      }

      const handleChangeDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setNewDetails(prev => ({...prev, [event.target.name]: event.target.value}))
      }

      const editDetails = async() => {
          try {
            if(userID) {
              await updateDetailsService(+userID, newDetails)
              .then(res => {
                setSuccessDetail(res)
                setTimeout(() => {
                  handleClose()
                  setSuccessDetail('')
                }, 1500);
              })
              .catch(err => {
                setErrorDetailsMsg(prev => prev = err.response.data)
              })
            }
          } catch (error) {
            console.log(error)
          }
      }
      
  return <>
    {details ? <>
    <div className="allDetails">
      <IconButton onClick={handleOpen}>
          <ModeEditOutlineOutlinedIcon />
      </IconButton>
          
        <div className="fullName">
          <h1>Hello {details.firstName} {details.lastName}</h1>
          <h2>Email: {details.email}</h2>
        </div>
    </div>
    <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">

            <Box sx={style}>
              <Typography mb={5}>Edit your Details:</Typography>
              
              <Typography sx={{color: 'green', fontSize: '13px', marginBottom: '10px'}}>
                {successDetail}
              </Typography>

              <Typography sx={{color: 'red', fontSize: '13px'}}>
                  {errorDetailsMsg.split(' ')[0] === 'First' ? errorDetailsMsg : ''}
              </Typography>

              <TextField
                name="firstName"
                defaultValue={details.firstName}
                onChange={handleChangeDetails}
                sx={{ marginBottom: '20px', width: '65%' }}
                id="outlined-basic"
                label="First name:"
                variant="outlined" />

                <Typography sx={{color: 'red', fontSize: '13px'}}>
                  {errorDetailsMsg.split(' ')[0] === 'Last' ? errorDetailsMsg : ''}
                </Typography>

                <TextField
                name="lastName"
                defaultValue={details.lastName}
                onChange={handleChangeDetails}
                sx={{ marginBottom: '20px', width: '65%' }}
                id="outlined-basic"
                label="Last name:"
                variant="outlined" />

               <Typography sx={{color: 'red', fontSize: '13px'}}>
                  {errorDetailsMsg.split(' ')[0] === 'Email' ? errorDetailsMsg : ''}
                </Typography>

                <TextField
                name="email"
                defaultValue={details.email}
                onChange={handleChangeDetails}
                sx={{ marginBottom: '20px', width: '65%' }}
                id="outlined-basic"
                label="Email:"
                variant="outlined" />


              <Button onClick={editDetails}>Update your details</Button>
              
              <Typography mb={5} mt={5}>Change password</Typography>
              
              <Typography sx={{color: 'green', fontSize: '13px', marginBottom: '10px'}}>
                {successPass}
              </Typography>
              
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
                
                <Typography sx={{color: 'red', fontSize: '13px'}}>
                  {errorPassMsg}
                </Typography>
              
              <Button onClick={handleChangePassword}>Update your details</Button>
            </Box>

          </Modal>
      </div>
        </>
     : <h1>Loading...</h1>}

      <FollowVacation/>
  </>
}

