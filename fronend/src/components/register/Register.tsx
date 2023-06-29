import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'


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

export const Register = () => {


      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);


      const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      })

      const [errorMsg, setError] = useState('')

      const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
            setUserInfo(prev => ({...prev, [event.target.name]: event.target.value}))
      }

      const checkRegister = async () => {
        try {
          axios.post('http://localhost:3001/api/auth/register', userInfo)
          .then(res => console.log(res))
          .catch(err => {
            setError(prev => prev = err.response.data)
          })
        } catch (error) {
          console.log(error)
        }

      }

    return <>
        <div>
            <Button onClick={handleOpen}>Register / Login</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography variant='h3' gutterBottom>Register</Typography>
                <form action=''>
                    
                    <Typography sx={{color: 'red', fontSize: '13px'}}>{errorMsg.split(' ')[0] === 'First' ? errorMsg : ''}</Typography>
                    <TextField name='firstName' onChange={handleInput} label="First Name"></TextField> <br/><br/>
                    
                    <Typography sx={{color: 'red', fontSize: '13px'}}>{errorMsg.split(' ')[0] === 'Last' ? errorMsg : ''}</Typography>
                    <TextField name='lastName' onChange={handleInput} label="Last Name"></TextField><br/><br/>
                    
                    <Typography sx={{color: 'red', fontSize: '13px'}}>{errorMsg.split(' ')[0] === 'Email' ? errorMsg : ''}</Typography>
                    <TextField name='email' onChange={handleInput} label="Email"></TextField><br/><br/>

                    <TextField name='password' onChange={handleInput} label="Password"></TextField><br/><br/>
                    <Typography sx={{color: 'red', fontSize: '13px'}}>{errorMsg.split(' ')[0] === 'Password' ? errorMsg : ''}</Typography>

                    <Button onClick={checkRegister}>Register</Button> <br/><br/>
                    <Button sx={{textTransform: "capitalize"}} >Already have an account Login</Button>

                </form>
              </Box>
            </Modal>
    </div>

    </>
}