import { React, useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchOnMap from "./SearchOnMap";
import trashIcon from "../images/trash.png";

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
  layout: {
    margin: "20px",
    display: "flex",
    flexDirection: "row",
  },
  leftLayout: {},
  rightLayout: {},
}));

const CreatePost = () => {
  const classes = useStyles();
  const [selectedImages, setSelectedImages] = useState([]);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    // console.log(selectedFiles);
    const selectedFilesArray = Array.from(selectedFiles);
    // console.log(selectedFilesArray);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previous) => previous.concat(imagesArray));
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
            <h2>Tags!</h2>
            <TextField
              label="Create Your Tags!"
              fullWidth
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.rightLayout}>
          <div>
            <h2>Search On Map</h2>
            <SearchOnMap />
          </div>
          <br />
          <Button variant="outlined" color="error">
            Discard
          </Button>
          <Button variant="contained" color="success">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
