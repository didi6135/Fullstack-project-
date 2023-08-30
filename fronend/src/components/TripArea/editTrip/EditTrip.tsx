import { Typography, TextField, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneTrip, updateTrip } from "../../../Services/tripService";
import { EditTripType, TripType } from "../../../types/TripType";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import "./editTrip.css";
import { useAppSelector } from "../../../app/hooks";
import { toast } from "react-toastify";

export const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selector = useAppSelector((state) => state.user.user);

  const [editTrip, setEditTrip] = useState<TripType>({
    TripId: 0,
    destination: "",
    tripDescription: "",
    dateStart: "",
    dateEnd: "",
    price: 0,
    imageFile: null,
    imageName: "",
  });
  const [currentTrip, setCurrentTrip] = useState<EditTripType>();
  const [previewImage, setPreviewImage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getTripById = async () => {
      if (id) {
        await getOneTrip(+id)
          .then(async (trip) => {
            setCurrentTrip(trip);
            setEditTrip({
              TripId: trip.TripId,
              destination: trip.destination,
              tripDescription: trip.tripDescription,
              dateStart: trip.dateStart,
              dateEnd: trip.dateEnd,
              price: trip.price,
              imageFile: null,
              imageName: trip.imageName,
            });

            const response = await axios.get(
              `http://localhost:3001/api/image/${trip.imageName}`
            );
            if (response.config.url) {
              setPreviewImage(response.config.url);
            }
          })
          .catch((err) => console.log(err));
      }
    };
    getTripById();
  }, [id]);

  const handleImageRemove = () => {
    setPreviewImage("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEditTrip((prev) => ({
        ...prev,
        imageName: file.name,
        imageFile: file,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {

    if (event instanceof Date) {
      setEditTrip((prev) => ({ ...prev, dateStart: event.toISOString() }));
    } else if (event && "target" in event) {
      
      setEditTrip((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (selector) {
        editTrip.dateStart = new Date(editTrip.dateStart).toISOString().slice(0, 19).replace('T', ' ');
        editTrip.dateEnd = new Date(editTrip.dateEnd).toISOString().slice(0, 19).replace('T', ' ');
  
        await updateTrip(editTrip, selector.token)
          .then((res) => {
            toast.success(`trip: ${editTrip.TripId}, updated successfully`)
            handleGoBack()
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoBack = () => {
    navigate("/vacationPage");
  };
  return (
    <>
      <div className="goBack">
        <IconButton onClick={handleGoBack}>
          <ArrowBackOutlinedIcon color="primary" />
        </IconButton>
      </div>

      {currentTrip ? (
        <div className="editContainer">

          <form
            className="editTripForm"
            action=""
            encType="multipart/form-data"
          >
            <div className="editTripDetails">
              <Typography>Destination:</Typography>
              <TextField
                variant="standard"
                defaultValue={currentTrip.destination}
                onChange={handleInput}
                name="destination"
                sx={{ width: "250px" }}
                type={"text"} 
              ></TextField>

              <Typography>Description:</Typography>
              <textarea
                className="descriptionEditTrip"
                defaultValue={currentTrip.tripDescription}
                onChange={handleInput}
                name="tripDescription"
                placeholder="Add Description"
                rows={5}
                cols={25}
              />

              <Typography>Start on:</Typography> 
              <input
                className="editDateStart"
                min={editTrip.dateStart.slice(0, 10)}
                defaultValue={new Date(currentTrip.dateStart).toISOString().slice(0, 19).replace('T', ' ')}
                onChange={handleInput}
                name="dateStart"
                type="date"
              />

              <Typography>End on:</Typography>
              <input
                className="editDateEnd"
                defaultValue={new Date(currentTrip.dateEnd).toISOString().slice(0, 19).replace('T', ' ')}
                min={editTrip.dateStart.slice(0, 10)}
                onChange={handleInput}
                name="dateEnd"
                type="date"
              />

              <Typography>Price:</Typography>
              <span style={{ marginRight: "4px" }}>$</span>
              <input
                placeholder="Enter price..."
                className="price-input"
                defaultValue={currentTrip.price}
                onChange={handleInput}
                name="price"
                type="number"
              />
            </div>

            <div className="coverImageDiv">
              <h3 className="coverImageTitle">Cover image:</h3>

              <div className="editImageDiv">
                {previewImage ? (
                  <img
                    className="editImage"
                    src={previewImage}
                    alt={currentTrip.imageName}
                  />
                ) : (
                  <AddPhotoAlternateOutlinedIcon
                    sx={{
                      fontSize: "100px",
                      height: "300px",
                      display: "flex",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  />
                )}
              </div>

              <div className="buttonToUploadImageOrRemove">
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                />

                <button
                  type="button"
                  className="coverImageButton"
                  onClick={() => {
                    if (previewImage) {
                      handleImageRemove();
                    } else {
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  {previewImage ? "Remove Image" : "Upload image"}
                </button>
              </div>
            </div>
          </form>
          <div className="editTripFinaleButton">
            <hr className="hrEditTrip" />
            <button className="editTripButton" onClick={handleSubmit}>
              Edit trip
            </button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};
