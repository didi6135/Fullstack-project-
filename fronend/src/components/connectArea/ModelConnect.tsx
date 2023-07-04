import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { Login } from "./login/Login";
import { Register } from "./register/Register";




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
            <Box sx={style}>
                {login ? <Login/> :<Register/>}

                <Button
                 sx={{textTransform: "capitalize"}}
                 onClick={handleRegister} >
                    {login ? 
                    "Don't have account sign up"
                     :
                    "Already have an account Login"}
                </Button>
            </Box>
        </Modal>
      </div>
    );
}


