import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import axios from "../../api";
import InfoInput from "../../components/InfoInput";
import bp1 from "../../images/bp1.jpg";
import { Backdrop, CircularProgress } from "@mui/material";

const useStyles = makeStyles(() => ({
  background: {
    margin: "0",
    padding: "0",
    width: "100%",
    height: "91.35vh",
    backgroundImage: `url(${bp1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  title: {
    margin: "5px",
  },
  error: {
    textAlign: "center",
  },
  bottomLayout: {
    margin: "0px",
    height: "50px",
    width: "250px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function PostDetailsEdit(props) {
  const classes = useStyles();
  const { postId } = useParams();
  //   const { user } = useAuth();
  const [editTitle, setEditTitle] = useState(props.editTitle);
  const [editDate, setEditDate] = useState(props.editDate);
  const [editTags, setEditTags] = useState(props.editTags);
  const [editDescription, setEditDescription] = useState(props.editDescription);
  const [editImages, setEditImages] = useState(props.editImages);
  const [tagsOnFocus, setTagsOnFocus] = useState(false);
  const [selectedImages, setSelectedImages] = useState([...editImages]);
  // const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImgRaw, setSelectedImgRaw] = useState([...editImages]);
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canPost =
      editDate.$y !== 0 && editTitle.length !== 0 && selectedImages.length <= 10
        ? true
        : false;
    setDisableSaveButton(!canPost);
  }, [editDate, editTitle, selectedImages]);

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImgRaw((previous) => previous.concat(selectedFilesArray));
    setSelectedImages((previous) => previous.concat(imagesArray));
  };

  const handleClickSave = async () => {
    setLoading(true);
    const id = String(postId.substring(1, postId.length));
    const imgURL = [];
    for (const img of selectedImgRaw) {
      var formdata = new FormData();
      formdata.append("image", img);
      // console.log("image sent to backend", img);
      const result = await axios.post("./uploadImg", formdata);
      if (typeof result.data === "string") {
        imgURL.push(result.data);
      } else {
        imgURL.push(img);
      }
    }
    const time = editDate.$d;
    const result = await axios.patch("/post", {
      id,
      location: editTitle,
      time: time === undefined ? editDate : time.toISOString(),
      tags: editTags,
      description: editDescription,
      images: imgURL,
      //   token: user.token,
    });
    setLoading(false);
    props.setEdit(false);
  };

  const handleChangeEditTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const handleOthersOnFocus = () => {
    setTagsOnFocus(false);
  };

  const handleTagsOnFocus = () => {
    setTagsOnFocus(true);
  };

  return (
    <div className={classes.background}>
      <center>
        <h1 className={classes.title}>Edit Post Details</h1>
        <div>
          <InfoInput
            dateInput={editDate}
            setDateInput={setEditDate}
            handleOthersOnFocus={handleOthersOnFocus}
            postTitle={editTitle}
            handleChangePostTitle={handleChangeEditTitle}
            onSelectFile={onSelectFile}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            selectedImgRaw={selectedImgRaw}
            setSelectedImgRaw={setSelectedImgRaw}
            content={editDescription}
            handleChangeContent={(e) => setEditDescription(e.target.value)}
            tags={editTags}
            setTags={setEditTags}
            tagsOnFocus={tagsOnFocus}
            handleTagsOnFocus={handleTagsOnFocus}
          />
        </div>
        <div className={classes.bottomLayout}>
          <Button variant="outlined" onClick={() => props.setEdit(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleClickSave}
            disabled={disableSaveButton}
          >
            Save
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </center>
    </div>
  );
}
