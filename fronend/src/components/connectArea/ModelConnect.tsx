import { Box, Button, Modal } from "@mui/material";
import { url } from "inspector";
import { useState } from "react";
import { Login } from "./login/Login";
import { Register } from "./register/Register";

import './modelConnect.css'


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



export const ModelConnect = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [login, setLogin] = useState(false)


    const handleRegister = () => {
        setLogin(prev => prev = !prev)
    }
  
    return (
      <div>
        <Button onClick={handleOpen}>Register / Login</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <div className="modelConnect"

            // sx={{
            //   position: 'absolute' as 'absolute',
            //   top: '50%',
            //   left: '50%',
            //   transform: 'translate(-50%, -50%)',
            //   width: 400,
            //   // backgroundImage: url('../../Assets/Images/full-shot-woman-travel-concept.jpg')
            //   backdropFilter: blur('20px')
            // }}
            >
              <div className="logo2"></div>
                {login ? <Login/> :<Register/>}

                <Button
                 sx={{
                  textTransform: "capitalize",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 'auto'}}
                 onClick={handleRegister} >
                    {login ? 
                    "Don't have account sign up"
                     :
                    "Already have an account Login"}
                </Button>
            </div>
        </Modal>
      </div>
    );
}


