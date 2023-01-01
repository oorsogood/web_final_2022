import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import axios from "../../api";
import GoogleMaps from "../../components/GoogleMaps";
import { TextField } from "@mui/material";
import { TagsInput } from "react-tag-input-component";
import trashIcon from "../../images/trash.png";
import { useMap } from "../../hooks/useMap";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-around",
  },
  background: {
    backgroundColor: "palegoldenrod",
    width: "100%",
    height: "100%",

    top: "0",
    left: "0",
  },
  mainPicture: {
    width: "50%",
    height: "50%",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
  },
  enterTags: {
    color: "royalblue",
  },
  trashIcon: {
    width: "20px",
    height: "20px",
  },
  imageSection: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    margin: "1rem .5rem",
    position: "relative",
  },
  imageIndex: {
    color: "darkslateblue",
    margin: "0",
  },
  deleteButton: {
    margin: "0",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "white",
  },
  indexAndDeleteIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  error: {
    textAlign: "center",
  },
}));

export default function PostDetailsEdit(props) {
  const classes = useStyles();

  const { location, setLocation, address, latitude, longitude } = useMap();
  const [editTitle, setEditTitle] = useState(props.editTitle);
  // edit date should wait for date complete
  // const [editDate, setEditDate] = useState(props.editDate);
  const [editTags, setEditTags] = useState(props.editTags);
  const [editDescription, setEditDescription] = useState(props.editDescription);
  const [editImages, setEditImages] = useState(props.editImages);
  const [editAddress, setEditAddress] = useState(props.editAddress);
  const [tagsOnFocus, setTagsOnFocus] = useState(false);

  const [selectedImages, setSelectedImages] = useState([...editImages]);
  const [selectedImgRaw, setSelectedImgRaw] = useState([]);

  const [disableSave, setDisableSave] = useState(false);

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImgRaw((previous) => previous.concat(selectedFilesArray));
    setSelectedImages((previous) => previous.concat(imagesArray));
  };

  const handleClickSave = () => {
    const body = {
      title: editTitle,
      // time: editDate,
      tags: editTags,
      description: editDescription,
      images: editImages, // this one i am not sure, maybe it should be selectedImages?
      address: editAddress, // this one not sure neither
      // might be other data that needs to be saved
    };
    console.log("body", body);
    // edit API here
    props.setEdit(false);
  };

  const handleChangeEditTitle = (e) => {
    setEditTitle(e.target.value);
    setLocation(e.target.value);
  };

  const handleOthersOnFocus = () => {
    setTagsOnFocus(false);
  };

  const handleTagsOnFocus = () => {
    setTagsOnFocus(true);
  };

  useEffect(() => {
    setEditTitle(location);
    // console.log("editTitle", editTitle);
  }, [location]);

  // useEffect(() => {
  //   if (
  //     editTitle !== 0 &&
  //     editAddress.length === 0 &&
  //     selectedImages.length === 0
  //   ) {
  //     setDisableSave(false);
  //   } else {
  //     setDisableSave(true);
  //   }
  // }, []);

  return (
    <div className={classes.background}>
      <div>
        <div className={classes.header}>
          <h1>PostDetailsEdit</h1>
          <div>
            <div>
              <Button variant="contained" onClick={() => props.setEdit(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleClickSave}
                disabled={disableSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.date}>
            {/* <ResponsiveDatePicker
              dateInput={dateInput}
              setDateInput={setDateInput}
            /> */}
          </div>
          <div className={classes.map}>
            <h2>Search On Map</h2>
            <GoogleMaps />
          </div>
          <div className={classes.PostTitle}>
            <h2>Title</h2>
            <div onFocus={handleOthersOnFocus}>
              <TextField
                label="Name of Location?"
                variant="outlined"
                value={editTitle}
                onChange={handleChangeEditTitle}
              />
            </div>
          </div>
          <div className={classes.address}>
            <h2>Address</h2>
            <div onFocus={handleOthersOnFocus}>
              <TextField
                label="Address?"
                variant="outlined"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.imagesSection}>
            <h2>Upload Picture!</h2>
            <input
              type="file"
              name="images"
              onChange={onSelectFile}
              multiple
              accept="image/png, image/jpeg, image/webp"
              style={{ display: "none" }}
              id="upload-button"
            />
            <label htmlFor="upload-button">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
            {selectedImages.length > 0 &&
              (selectedImages.length > 10 ? (
                <p className={classes.error}>
                  You can't upload more than <b>10</b> images!
                  <br />
                  <span>
                    Please delete <b>{selectedImages.length - 10}</b> images.
                  </span>
                </p>
              ) : (
                <></>
              ))}
            <div className={classes.imageSection}>
              {selectedImages &&
                selectedImages.map((img, index) => {
                  return (
                    <div key={img} className={classes.images}>
                      <img src={img} alt="uploadFile" height="100" />
                      <div className={classes.indexAndDeleteIcon}>
                        <p className={classes.imageIndex}>
                          Picture {index + 1}
                        </p>
                        <button
                          className={classes.deleteButton}
                          onClick={() =>
                            setSelectedImages(
                              selectedImages.filter((e) => e !== img)
                            )
                          }
                        >
                          <img
                            className={classes.trashIcon}
                            src={trashIcon}
                            alt="trashCanIcon"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className={classes.description}>
          <h2>Any Idea?</h2>
          <div onFocus={handleOthersOnFocus}>
            <TextField
              label="What's on your mind?"
              multiline
              rows={4}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.tags}>
          <h2>Add HashTags</h2>
          <div onFocus={handleTagsOnFocus}>
            <TagsInput
              value={editTags}
              onChange={(e) => {
                let newTags = e;
                setEditTags(newTags);
              }}
              placeHolder="Your Hashtags"
            />
            {tagsOnFocus && (
              <div>
                <p className={classes.enterTags}>
                  press <b>Enter</b> to add new tag.
                </p>
                <p className={classes.enterTags}>
                  press <b>BackSpace</b> to remove tag.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
