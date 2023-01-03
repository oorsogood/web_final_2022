import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GoogleMaps from "./GoogleMaps";
import trashIcon from "../images/trash.png";
import { MapProvider, useMap } from "../hooks/useMap";
import { TagsInput } from "react-tag-input-component";
import ResponsiveDatePicker from "./DatePicker";
import axios from "../api";
import moment from "moment";

const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: "#F6F5F2",
    height: "90.5vh"
  },
  title: {
    color: "#69C123",
    margin: "5px"
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  h2: {
    margin: "5px"
  },
  requiredField: {
    margin: "0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
    overflow: "scroll",
    height: "150px"
  },
  uploadImage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  images: {
    margin: "1rem .5rem",
    position: "relative",
  },
  imageIndex: {
    color: "darkslateblue",
    margin: "0",
    position: "absolute",
    left: "50%",
    bottom: "0%",
    transform: "translate(-50%, 70%)"
  },
  deleteButton: {
    margin: "0",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "white",
    position: "absolute",
    right: "0%",
    transform: "translate(0%, 20%)"
  },
  indexAndDeleteIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  error: {
    textAlign: "center",
  },
  tags: {
    width: "350px",
  },
  enterTags: {
    color: "royalblue",
  },
  tagInput: {
    width: "400px"
  },
  //   layout: {
  //     margin: "20px",
  //     display: "flex",
  //     flexDirection: "row",
  //   },
  rightLayout: {
    width: "600px",
    height: "600px",
    margin: "0",
  },
  leftLayout: {
    width: "600px",
    height: "600px",
    margin: "0"
  },
  bottomLayout: {
    margin: "0px",
    height: "50px",
    width: "250px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }
}));

const CreatePostPage = () => {
  return (
    <MapProvider>
      <CreatePost />
    </MapProvider>
  );
};

const CreatePost = () => {
  const { location, setLocation, address, latitude, longitude } = useMap();
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImgRaw, setSelectedImgRaw] = useState([]);
  const [dateInput, setDateInput] = useState(Date());
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsOnFocus, setTagsOnFocus] = useState(false);
  const [disablePostButton, setDisablePostButton] = useState(true);

  useEffect(() => {
    if (
      dateInput.$y !== 0 &&
      latitude !== null &&
      postTitle.length !== 0
    ) {
      setDisablePostButton(false);
    } else {
      setDisablePostButton(true);
    }
  }, [dateInput, location, postTitle, selectedImages, content, tags, latitude]);

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImgRaw((previous) => previous.concat(selectedFilesArray));
    setSelectedImages((previous) => previous.concat(imagesArray));
  };

  const handleChangePostTitle = (e) => {
    setPostTitle(e.target.value);
    setLocation(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleTagsOnFocus = () => {
    setTagsOnFocus(true);
  };

  const handleOthersOnFocus = () => {
    setTagsOnFocus(false);
  };

  const handlePost = async () => {
    const time = dateInput.$d;
    const username = JSON.parse(window.localStorage.getItem("user")).username;
    const result = await axios.get("/user", {
      params: {
        username,
      },
    });
    const userID = result.data.contents;
    const imgURL = [];
    for (const img of selectedImgRaw) {
      var formdata = new FormData();
      formdata.append("image", img);
      const result = await axios.post("./uploadImg", formdata);
      imgURL.push(result.data);
    }

    const newPost = await axios.post("./post", {
      id: uuidv4(),
      location,
      address,
      latitude,
      longitude,
      time: (time === undefined ? dateInput : time.toISOString()),
      description: content,
      tags: tags,
      images: imgURL,
      userID: userID,
      author: username,
    });
    navigate("/dashboard/home");
  };

  useEffect(() => {
    setPostTitle(location);
  }, [location]);

  return (
    <div className={classes.background}>
      <center>
        <h1 className={classes.title}>Create a New Post!</h1>
      </center>
      <div className={classes.wrapper}>
        <div className={classes.leftLayout}>
          <center>
            <h2 className={classes.h2}>Pin or search!*</h2>
          </center>
          <GoogleMaps />
          <h3 >Address: {address}</h3>
        </div>
        <div className={classes.rightLayout}>
          <div className={classes.requiredField}>
            <div className={classes.date}>
              <h2 className={classes.h2}>Date*</h2>
              <ResponsiveDatePicker
                dateInput={dateInput}
                setDateInput={setDateInput}
              />
            </div>
            <div>
              <h2 className={classes.h2}>Location*</h2>
              <div className={classes.PostTitle} onFocus={handleOthersOnFocus}>
                <TextField
                  label="Name of location"
                  variant="outlined"
                  value={postTitle}
                  onChange={handleChangePostTitle}
                  style={{ width: "300px" }}
                />
              </div>
            </div>
          </div>
          <div className={classes.imagesSection}>
            <div className={classes.uploadImage}>
              <h2 className={classes.h2}>Upload Pictures</h2>
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
            </div>
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
                        <p className={classes.imageIndex}>{index + 1}</p>
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
          <div className="content">
            <h2 className={classes.h2}>Description</h2>
            <div onFocus={handleOthersOnFocus}>
              <TextField
                label="What's on your mind?"
                multiline
                rows={2}
                value={content}
                onChange={handleChangeContent}
                style={{ width: "600px", overflow: "scroll" }}
              />
            </div>
          </div>
          <div>
            <h2 className={classes.h2}>HashTags</h2>
            <div className={classes.tags} onFocus={handleTagsOnFocus}>
              <TagsInput
                value={tags}
                onChange={setTags}
                placeHolder="Your hashtags"
                classNames={{ tag:'tag-cls', input: classes.tagInput }}
              />
              {tagsOnFocus && (
                <div>
                  <p className={classes.enterTags}>
                    <b>Enter</b> to add new tags and <b>Backspace</b> to remove.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <center>
        <div className={classes.bottomLayout}>
          {/* <br /> */}
          <Button variant="outlined" onClick={() => navigate("/dashboard/home")}>Discard</Button>
          <Button
            variant="contained"
            color="success"
            disabled={disablePostButton}
            onClick={handlePost}
          >
            Post
          </Button>
        </div>
      </center>
    </div>
  );
};

export default CreatePostPage;
