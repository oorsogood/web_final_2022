import { React, useState, useEffect } from "react";
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
  //   layout: {
  //     margin: "20px",
  //     display: "flex",
  //     flexDirection: "row",
  //   },
  //   leftLayout: {
  //     width: "450px",
  //     margin: "auto",
  //   },
  //   rightLayout: {
  //     margin: "auto",
  //   },
}));

const CreatePostPage = () => {
	return (
		<MapProvider>
			<CreatePost />
		</MapProvider>
	)
};

const CreatePost = () => {
	// const user = JSON.parse(window.localStorage.getItem("user"));
	// console.log("User is", user.username);
  const { address, latitude, longitude } = useMap();
  const classes = useStyles();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImgRaw, setSelectedImgRaw] = useState([]);
  //   const [date, setDate] = useState([
  //     {
  //       Year: moment().toYear(),
  //       Month: moment().toMonth(),
  //       Date: moment().toDate(),
  //       key: "selection",
  //     },
  //   ]);
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsOnFocus, setTagsOnFocus] = useState(false);

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
		const result = await axios.get("/user", {
      params: {
        username: JSON.parse(window.localStorage.getItem("user")).username
      }
    });
		const userID = result.data.contents;
    console.log("userID", userID);
    const imgURL = [];
    for (const img of selectedImgRaw) {
      // console.log(img);
      var formdata = new FormData();
      formdata.append("image", img);
      const result = await axios.post("./uploadImg", formdata);
      // console.log(result.data);
      imgURL.push(result.data);
    }
    // console.log("Finish mapping", imgURL);
    const newPost = await axios.post("./post", {
      id: uuidv4(),
      address,
      latitude,
      longitude,
      time: Date.now(),
      description: content,
      tags: tags,
      images: imgURL,
			userID: userID
    });
    // console.log(newPost);
  };

  //   useEffect(() => {
  //     console.log("date", date);
  //   }, [date]);

  //   useEffect(() => {
  //     setPostTitle(address);
  //     console.log("postTitle", postTitle);
  //   }, [address, postTitle]);

  return (
    <div>
      <center>
        <h1 className={classes.title}>Create a New Post!</h1>
      </center>
      <div>
        <div className={classes.date}>
          <ResponsiveDatePicker />
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
              value={postTitle}
              onChange={handleChangePostTitle}
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
                      <p className={classes.imageIndex}>Picture {index + 1}</p>
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
      <div className="content">
        <h2>Any Idea?</h2>
        <div onFocus={handleOthersOnFocus}>
          <TextField
            label="What's on your mind?"
            multiline
            rows={4}
            value={content}
            onChange={handleChangeContent}
          />
        </div>
      </div>
      <div className="tags">
        <h2>Add HashTags</h2>
        <div onFocus={handleTagsOnFocus}>
          <TagsInput
            value={tags}
            onChange={setTags}
            placeHolder="Your Hashtags"
          />
          {tagsOnFocus && (
            <p className={classes.enterTags}>press Enter to add new tag.</p>
          )}
        </div>
      </div>
      <div>
        <br />
        <Button variant="outlined" color="error">
          Discard
        </Button>
        <Button variant="contained" color="success" onClick={handlePost}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePostPage;
