import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { addNewTrip } from "../../Services/tripService";
import { TripType } from "../../types/TripType";

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

export const AddNewTrip = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [tripValue, setTripValue] = useState<TripType>({
        tripId: 0,
        destination: '',
        tripDescription: '',
        dateStart: '',
        dateEnd: '',
        price: 0,
        imageFile: null,
        imageName: ''

    })

    const handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setTripValue(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const handleSubmit = async () => {
    try {
      await addNewTrip(tripValue)
      .then(res => console.log(res))
      .catch(err => console.log(err.response.data))
      
    } catch (error) {
      console.log(error)
    }

  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = event.target.files?.[0];
    if (file) {
      setTripValue(prev => ({ ...prev, imageFile: file}));
    }
  };

    return <>
      <Button onClick={handleOpen}>Add new trip</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box sx={style}>
            <form action="" encType="multipart/form-data">
            <Typography>Destination:</Typography>
            <TextField onChange={handleInput} name='destination' sx={{width: '250px'}} type={'text'}></TextField>
            
            
            <Typography>Description:</Typography>
            <textarea onChange={handleInput} name='tripDescription' placeholder="Add Description" rows={5} cols={31}/>

            <Typography>Start on:</Typography>
            <input onChange={handleInput} name='dateStart' type="date"
            min={new Date().toISOString().split('T')[0]}
            />

            <Typography>End on:</Typography>
            <input onChange={handleInput} name='dateEnd' type="date" />

            <Typography>Price:</Typography>
            <input onChange={handleInput} name='price' type="number" />

            <Typography>Cover image:</Typography>
            <input onChange={handleFileChange} name='imageFile' type="file" /> <br/><br/>

            <Button onClick={handleSubmit}>Add new trip</Button>
            </form>


        </Box>
      </Modal>
    </>
}