import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { registerUser } from '../../../Services/authService';

import { RegisterType } from '../../../types/RegisterType';
import { useNavigate } from 'react-router-dom';

import './register.css'

// const style = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

export const Register = () => {

  const navigate = useNavigate()

      const [userInfo, setUserInfo] = useState<RegisterType>({
        firstName: '',
        lastName: '',
        email: '',
        password: ''

      })

      const [errorMsg, setError] = useState('')

      const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
            setUserInfo(prev => ({...prev, [event.target.name]: event.target.value}))
      }

      const checkRegister = async () => {
        try {
          await registerUser(userInfo)
          .then(res => {
            localStorage.setItem('Token', JSON.stringify(res[0]))
            localStorage.setItem('role', JSON.stringify(res[1]))
            localStorage.setItem('id', JSON.stringify(res[2]))
            navigate('/vacationPage')
          })
          .catch(err => {
            setError(prev => prev = err.response.data)
          })
        } catch (error) {
          console.log(error)
        }

      }


    return <>
              <div className='registerPage' >
                <h1 className='registerTitle'>Welcome</h1>
                <form action=''>
                    
                    <Typography sx={{color: 'red', fontSize: '13px'}}>
                      {errorMsg.split(' ')[0] === 'First' ? errorMsg : ''}
                    </Typography>

                    <TextField fullWidth variant="standard" name='firstName' onChange={handleInput} label="First Name"></TextField> <br/><br/>
                    
                    <Typography sx={{color: 'red', fontSize: '13px'}}>
                      {errorMsg.split(' ')[0] === 'Last' ? errorMsg : ''}
                    </Typography>

                    <TextField fullWidth variant="standard" name='lastName' onChange={handleInput} label="Last Name"></TextField><br/><br/>
                    
                    <Typography sx={{color: 'red', fontSize: '13px'}}>
                      {errorMsg.split(' ')[0] === 'Email' ? errorMsg : ''}
                    </Typography>

                    <TextField fullWidth variant="standard" name='email' onChange={handleInput} label="Email"></TextField><br/><br/>

                    <TextField fullWidth variant="standard" name='password' onChange={handleInput} label="Password"></TextField><br/><br/>
                    
                    <Typography sx={{color: 'red', fontSize: '13px'}}>
                      {errorMsg.split(' ')[0] === 'Password' ? errorMsg : ''}
                    </Typography>

                    <Button sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 'auto'
                    }} onClick={checkRegister}>Register</Button> <br/><br/>
                    
                </form>
              </div>
    </>
}