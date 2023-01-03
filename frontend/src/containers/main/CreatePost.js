import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GoogleMaps from "../../components/GoogleMaps";
import { MapProvider, useMap } from "../../hooks/useMap";
import axios from "../../api";
import InfoInput from "../../components/InfoInput";
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
  error: {
    textAlign: "center",
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
    const canPost = (
      dateInput.$y !== 0 &&
      latitude !== null &&
      postTitle.length !== 0 &&
      selectedImages.length <= 10
    ) ? true : false;
    setDisablePostButton(!canPost);
  }, [dateInput, postTitle, selectedImages, latitude]);

  const onSelectFile = (e) => {
    console.log("File selected");
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
        <h1 className={classes.title}>Create a New Post !</h1>
      </center>
      <div className={classes.wrapper}>
        <div className={classes.leftLayout}>
          <center>
            <h2 className={classes.h2}>Pin or search ! *</h2>
          </center>
          <GoogleMaps />
          <h3 style={{ margin: "5px" }}>Address: {address}</h3>
        </div>
        <InfoInput
          dateInput={dateInput}
          setDateInput={setDateInput}
          handleOthersOnFocus={handleOthersOnFocus}
          postTitle={postTitle}
          handleChangePostTitle={handleChangePostTitle}
          onSelectFile={onSelectFile}
          selectedImages={selectedImages}
          selectedImgRaw={selectedImgRaw}
          setSelectedImages={setSelectedImages}
          setSelectedImgRaw={setSelectedImgRaw}
          content={content}
          handleChangeContent={handleChangeContent}
          tags={tags}
          setTags={setTags}
          tagsOnFocus={tagsOnFocus}
          handleTagsOnFocus={handleTagsOnFocus}
        />
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
