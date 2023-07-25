import React, { useEffect, useState } from "react"
import { changePassword, getUserDetails, updateDetailsService } from "../../Services/authService"
import { NewPasswordType, RegisterType, UpdateUserDetailsType, UserResponse } from "../../types/RegisterType"

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Box, Modal, Button, TextField, Typography, IconButton } from "@mui/material";

// import Button from '@mui/material-next/Button';

import './privateArea.css'
import { FollowVacation } from "./followVacation/FollowVacation";
import { getTripsThatUserFollowService } from "../../Services/followersService";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/userSlice/UserSlice";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from "react-router-dom";


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



export const PrivateArea = () => {

  const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false)
      setErrorDetailsMsg('')
      setErrorPassMsg('')
    };
    const selector = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const [details, setDetails] = useState<RegisterType>()

    const [newDetails, setNewDetails] = useState<UserResponse>({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      token: ''
    })

    const [currentPass, setCurrentPass] = useState('')

    const [newPass, setNewPass] = useState<NewPasswordType>({
      currentPassword: '',
      newPassword: ''
    })

    const [errorPassMsg, setErrorPassMsg] = useState('')
    const [errorDetailsMsg, setErrorDetailsMsg] = useState('')

    const [successPass, setSuccessPass] = useState('')
    const [successDetail, setSuccessDetail] = useState('')

   useEffect(() => {
    if(selector) {
      setNewDetails(prev => ({...prev,
        id: selector.id,
        firstName: selector.firstName,
        lastName: selector.lastName,
        email: selector.email,
        role: selector.role,
        token: selector.token
      }))
    }

   }, [selector])



      // const handleChangeCurrentPass = (event: React.ChangeEvent<HTMLInputElement>) => {
      //     setCurrentPass(prev => ({...prev, currentPassword: event.currentTarget.value}))
      // }
  

      const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPass(prev => ({...prev, [event.target.name]: event.currentTarget.value}))
      }
  

      const handleChangePassword = async () => {
        if(selector) {
          console.log(newPass)
          if(newPass.currentPassword && newPass.newPassword){
            await changePassword(selector.id, newPass)
            .then(res => {
                setSuccessPass(res)
                setTimeout(() => {
                  handleClose()
                  setSuccessPass('')
                }, 1500);
            })
            .catch(err => setErrorPassMsg(prev => prev = err.response.data))
          } else {
            setErrorPassMsg('Please enter password')
          }
        }
      }


      const handleChangeDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewDetails(prev => ({...prev, [event.target.name]: event.target.value}))
      }


      const editDetails = async() => {
          try {
            if(selector) {
              await updateDetailsService(selector.id, newDetails)
              .then(res => {
                  setSuccessDetail('Your details have been successfully changed')
                  dispatch(setUser(res))
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

      const handleHomePage = () => {
        navigate('/vacationPage')
      }
      
  return <>
    {selector ? <>
    <div className="buttonPrivateArea">
      <IconButton onClick={handleHomePage}>
        <ArrowBackOutlinedIcon color="primary"/>
      </IconButton>
      <IconButton onClick={handleOpen}>
          <ModeEditOutlineOutlinedIcon color="primary" />
      </IconButton>
    </div>
    <div className="allDetails">

          
        <div className="fullName">
          <h1>Hello {selector.firstName} {selector.lastName}</h1>
          <h2>Email: {selector.email}</h2>
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
                defaultValue={selector.firstName}
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
                defaultValue={selector.lastName}
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
                defaultValue={selector.email}
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
                name="currentPassword"
                onChange={handleChangePass}
                sx={{ marginBottom: '20px', width: '65%' }}
                id="outlined-basic"
                label="Set your current password:"
                variant="outlined" />

              <TextField
                name="newPassword"
                onChange={handleChangePass}
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

