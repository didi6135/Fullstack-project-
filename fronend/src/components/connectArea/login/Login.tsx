import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { LoginCredentialsType } from '../../../types/LoginCredentialsType';
import { loginUser } from '../../../Services/authService';
import { useNavigate } from 'react-router-dom';


export const Login = () => {

  const navigate = useNavigate()

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
        localStorage.setItem('Token', JSON.stringify(res[0]))
        localStorage.setItem('role', JSON.stringify(res[1]))
        localStorage.setItem('id', JSON.stringify(res[2]))
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
        <div>
              <Box >
              <Typography variant='h3' gutterBottom>Login</Typography>
                <form action=''>
                <Typography sx={{color: 'red', fontSize: '13px'}}>{errorMsg.split(' ')[0] === 'Incorrect' ? errorMsg : ''}</Typography>
                <Typography sx={{color: 'red', fontSize: '13px'}}>{errorMsg.split(' ')[0] === 'Email' ? errorMsg : ''}</Typography>
                    <TextField name='email' onChange={handleInput} label="Email"></TextField><br/><br/>

                    <TextField name='password' onChange={handleInput} label="Password"></TextField><br/><br/>
                    <Typography sx={{color: 'red', fontSize: '13px'}}>{errorMsg.split(' ')[0] === 'Password' ? errorMsg : ''}</Typography>
                

                    <Button onClick={checkLogin}>Login</Button> <br/><br/>
                </form>
              </Box>
          </div>

    </>
}