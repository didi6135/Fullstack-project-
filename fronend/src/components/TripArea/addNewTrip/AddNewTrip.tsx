import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { addNewTrip } from "../../../Services/tripService";
import { TripType } from "../../../types/TripType";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

export const AddNewTrip = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false)
    setTripValue({    
      TripId: 0,
      destination: "",
      tripDescription: "",
      dateStart: "",
      dateEnd: "",
      price: 0,
      imageFile: null,
      imageName: "",})
  };

  const [errorMsg, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tripValue, setTripValue] = useState<TripType>({
    TripId: 0,
    destination: "",
    tripDescription: "",
    dateStart: "",
    dateEnd: "",
    price: 0,
    imageFile: null,
    imageName: "",
  });


  const handleInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTripValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await addNewTrip(tripValue)
        .then((res) => console.log(res))
        .catch((err) => setError((prev) => (prev = err.response.data)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setTripValue((prev) => ({
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

  const handleImageRemove = () => {
    setPreviewImage("");
  };

  return (
    <>
      <Button
        sx={{
          color: "white",
          border: "1px solid white",
        }}
        onClick={handleOpen}
      >
        Add new trip
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
                onChange={handleInput}
                name="destination"
                sx={{ width: "250px" }}
                type={"text"}
              ></TextField>
              {errorMsg.split(" ")[0] === '"destination"' ? errorMsg : ""}

              <Typography>Description:</Typography>
              <textarea
                className="descriptionEditTrip"
                onChange={handleInput}
                name="tripDescription"
                placeholder="Add Description"
                rows={5}
                cols={25}
              />
              {errorMsg.split(" ")[0] === '"tripDescription"' ? errorMsg : ""}

              <Typography>Start on:</Typography>
              <input
                className="editDateStart"
                min={new Date().toISOString().split("T")[0]}
                onChange={handleInput}
                name="dateStart"
                type="date"
              />
              {errorMsg.split(" ")[0] === '"dateStart"' ? errorMsg : ""}

              <Typography>End on:</Typography>
              <input
                min={new Date().toISOString().split("T")[0]}
                onChange={handleInput}
                name="dateEnd"
                type="date"
              />
              {errorMsg.split(" ")[0] === '"dateEnd"' ? errorMsg : ""}

              <Typography>Price:</Typography>
              <input onChange={handleInput} name="price" type="number" />
              {errorMsg.split(" ")[0] === '"price"' ? errorMsg : ""}
            </div>

            <div className="coverImageDiv">
              <h3 className="coverImageTitle">Cover image:</h3>

              <div className="editImageDiv">
                {previewImage ? (
                  <img
                    className="editImage"
                    src={previewImage}
                    alt={tripValue.imageName}
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
                {errorMsg.split(" ")[0] === '"imageName"' ? errorMsg : ""}
              </div>
            </div>
          </form>
          <div className="editTripFinaleButton">
            <hr className="hrEditTrip" />
            <button className="editTripButton" onClick={handleSubmit}>
              Add new trip
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
