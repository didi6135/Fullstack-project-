import { Button, Typography, TextField, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneTrip, updateTrip } from "../../../Services/tripService";
import { EditTripType, TripType } from "../../../types/TripType";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';


import './editTrip.css'


export const EditTrip = () => {

  const { id } = useParams()

    const [editTrip, setEditTrip] = useState<TripType>({
      TripId: 0,
      destination: '',
      tripDescription: '',
      dateStart: '',
      dateEnd: '',
      price: 0,
      imageFile: null,
      imageName: ''

  })
  const [currentTrip, setCurrentTrip] = useState<EditTripType>()
    const [previewImage, setPreviewImage] = useState('')

    const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
      const getTripById = async() => {
        if(id) {
          await getOneTrip(+id)
          .then( async (trip) => {
            
            setCurrentTrip(trip) 
            setEditTrip({
              TripId: trip.TripId,
              destination: trip.destination,
              tripDescription: trip.tripDescription,
              dateStart: trip.dateStart,
              dateEnd: trip.dateEnd,
              price: trip.price,
              imageFile: null,
              imageName: trip.imageName
            })

            const response = await axios.get(`http://localhost:3001/api/image/${trip.imageName}`)
            if(response.config.url) {
              setPreviewImage(response.config.url)
          }
          })
          .catch(err => console.log(err))
        }
      }
      getTripById()
  }, [id])

    const handleImageRemove = () => {
      setPreviewImage('');
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
      const file = event.target.files?.[0];
      console.log(file)
      if (file) {
        setEditTrip(prev => ({
           ...prev,
           imageName: file.name,
            imageFile: file}));

            const reader = new FileReader();
            reader.onload = () => {
              setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
      }

    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditTrip(prev => ({...prev, [event.target.name]: event.target.value}))
      // console.log(editTrip)
    }


    const handleSubmit = async () => {
      try {
        await updateTrip(editTrip)
        .then(res => console.log('updated'))
        .catch(err => console.log(err))
      } catch (error) {
        console.log(error)
      }
        
    }

    return <>
      {/* <Button onClick={handleOpen}>Edit trip</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"> */}

        {currentTrip ? 
        <div className="editContainer">

            <form action="" encType="multipart/form-data">
            <div className="editTripDetails">
              <Typography>Destination:</Typography>
              <TextField 
              variant="standard"  
              defaultValue={currentTrip.destination} 
              onChange={handleInput} 
              name='destination' 
              sx={{width: '250px'}} 
              type={'text'}></TextField>

              <Typography>Description:</Typography>
              <textarea defaultValue={currentTrip.tripDescription} onChange={handleInput} name='tripDescription' placeholder="Add Description" rows={5} cols={31}/>

              <Typography>Start on:</Typography>
              <input 
              defaultValue={currentTrip.dateStart.slice(0, 10)}
              onChange={handleInput} 
              name='dateStart' 
              type="date"
              />

              <Typography>End on:</Typography>
              <input 
              defaultValue={currentTrip.dateEnd.slice(0, 10)}
              onChange={handleInput} 
              name='dateEnd' 
              type="date" />

              <Typography>Price:</Typography>
              <input 
              defaultValue={currentTrip.price}
              onChange={handleInput} 
              name='price' 
              type="number" />
            </div>
           
          <div className="coverImageDiv">
          <h3 className="coverImageTitle">Cover image:</h3>

            <div className="editImageDiv">
                {previewImage ? 
                <img 
                 className="editImage"
                 src={previewImage} 
                 alt={currentTrip.imageName} />
                 :
                <AddPhotoAlternateOutlinedIcon 
                sx={{
                    fontSize: '100px', 
                    height: '300px',
                    display: 'flex', 
                    alignItems: 'center', 
                    margin: 'auto'
                  }} 
                />}
            </div>

            <div className="buttonToUploadImageOrRemove">
                <input 
                  type="file"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  />
            
              <button 
                type="button" 
                className="coverImageButton"  
                onClick={() => {
                  if(previewImage) {
                    handleImageRemove()
                  } else {
                    fileInputRef.current?.click()
                  }
                }}>
                {previewImage ? 'Remove Image' : 'Upload image'}
              </button>
            </div>

          </div>
            </form>
            <hr className="hrEditTrip"/>
            <button className="editTripButton" onClick={handleSubmit}>Edit trip</button>
        </div> : <h1>Loading...</h1>}
      {/* </Modal> */}
    </>
}