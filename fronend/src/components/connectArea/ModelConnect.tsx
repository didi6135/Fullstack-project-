import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { Login } from "./login/Login";
import { Register } from "./register/Register";

import "./modelConnect.css";

export const ModelConnect = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [login, setLogin] = useState(false);

  const handleRegister = () => {
    setLogin((prev) => (prev = !prev));
  };

  return (
    <div>
      <Button
        sx={{
          color: "white",
          border: "1px solid white",
        }}
        onClick={handleOpen}
      >
        Register / Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modelConnect">
          <div className="logo2"></div>
          {login ? <Login /> : <Register />}

          <Button
            sx={{
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
            onClick={handleRegister}
          >
            {login
              ? "Don't have account sign up"
              : "Already have an account Login"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
