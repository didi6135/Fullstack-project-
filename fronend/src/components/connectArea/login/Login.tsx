import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { LoginCredentialsType } from '../../../types/LoginCredentialsType';
import { loginUser } from '../../../Services/authService';
import { useNavigate } from 'react-router-dom';

import './login.css'
import { useAppDispatch } from '../../../app/hooks';
import { setUser } from '../../../features/userSlice/UserSlice';

export const Login = () => {

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

      const [ loginInfo, setLoginInfo] = useState<LoginCredentialsType>({
        email: '',
        password: ''
      })
      const [errorMsg, setError] = useState('')
      
      const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const checkLogin = async () => {

    try {

      await loginUser(loginInfo)
      .then(res => {
          dispatch(setUser(res))
        navigate('/vacationPage')
      })
      .catch(err => {
        console.log(err.response.data);
        
        setError(prev => prev = err.response.data)
      })
    } catch (error) {
      console.log(error);
      
    }
  }

    return <>
        <div className='loginPage'>
              <div  >
              <h1 className='loginTitle'>Login</h1>
                <form action=''>
                <Typography sx={{color: 'red', fontSize: '13px'}}>{errorMsg.split(' ')[0] === 'Incorrect' ? errorMsg : ''}</Typography>
                <Typography sx={{color: 'red', fontSize: '13px'}}>{errorMsg.split(' ')[0] === 'Email' ? errorMsg : ''}</Typography>
                    <TextField fullWidth variant="standard" name='email' onChange={handleInput} label="Email"></TextField><br/><br/>

                    <TextField fullWidth variant="standard" name='password' onChange={handleInput} label="Password"></TextField><br/><br/>
                    <Typography sx={{color: 'red', fontSize: '13px'}}>{errorMsg.split(' ')[0] === 'Password' ? errorMsg : ''}</Typography>
                

                    <Button sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 'auto'
                    }} onClick={checkLogin}>Login</Button> <br/><br/>
                </form>
              </div>
          </div>

    </>
}