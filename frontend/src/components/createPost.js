import { React, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GoogleMaps from "./GoogleMaps";
import trashIcon from "../images/trash.png";
import { useMap } from "../hooks/useMap";
import { TagsInput } from "react-tag-input-component";
import axios from "../api";

const useStyles = makeStyles(() => ({
  title: {
    color: "yellowgreen",
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
  enterTags: {
    color: "royalblue",
  },
  layout: {
    margin: "20px",
    display: "flex",
    flexDirection: "row",
  },
  leftLayout: {
    width: "450px",
    margin: "auto",
  },
  rightLayout: {
    margin: "auto",
  },
}));

const CreatePost = () => {
  const { address, latitude, longitude } = useMap();
  const classes = useStyles();
  const [selectedImages, setSelectedImages] = useState([]);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    // console.log("selectedFiles", selectedFiles);
    const selectedFilesArray = Array.from(selectedFiles);
    // console.log(selectedFilesArray);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previous) => previous.concat(imagesArray));
  };

  const handlePost = async () => {
    const result = await axios.post("./post", {
      id: uuidv4(),
      address,
      latitude,
      longitude,
      time: Date.now(),
      description: content,
      tags: tags,
    });
    console.log(result);
  };

  return (
    <div>
      <center>
        <h1 className={classes.title}>Create a New Post!</h1>
      </center>
      <div className={classes.layout}>
        <div className={classes.leftLayout}>
          <div className="pictureSection">
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
          <div className="content">
            <h2>Any Idea?</h2>
            <TextField
              label="What's on your mind?"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="tags">
            <h2>Add HashTags</h2>
            <TagsInput
              value={tags}
              onChange={setTags}
              placeHolder="Your Hashtags"
            />
            <p className={classes.enterTags}>press Enter to add new tag.</p>
          </div>
        </div>
        <div className={classes.rightLayout}>
          <div>
            <h2>Search On Map</h2>
            {/* <SearchOnMap /> */}
            <GoogleMaps />
          </div>
          <br />
          <Button variant="outlined" color="error">
            Discard
          </Button>
          <Button variant="contained" color="success" onClick={handlePost}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
