import { React, useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchOnMap from "./SearchOnMap";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles(() => ({
  title: {
    color: "yellowgreen",
  },
  imgPreview: {
    color: "midnightblue",
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
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const [imgfile, setImgfile] = useState([]);
  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      setImgfile((imgfile) => [
        ...imgfile,
        URL.createObjectURL(e.target.files[0]),
      ]);
    }
  };

  const deleteImage = (id) => {
    const removeArr = [...imgfile].filter((img) => img.id !== id);
    setImgfile([removeArr]);
    console.log("length", imgfile.length);
  };

  return (
    <div>
      <center>
        <h1 className={classes.title}>Create a New Post!</h1>
      </center>
      <div className={classes.layout}>
        <div className={classes.leftLayout}>
          <div className="picture">
            <h2>Upload Picture!</h2>
            <input type="file" onChange={imgFilehandler} />
            {imgfile.length !== 0 ? (
              <h2 className={classes.imgPreview}>Preview Your Images</h2>
            ) : (
              <></>
            )}
            {imgfile.map((file) => {
              return (
                <>
                  <span key={file}>
                    <img src={file} height="200" width="200" alt="med1" />
                  </span>
                  <IconButton aria-label="delete" onClick={deleteImage}>
                    <DeleteIcon />
                  </IconButton>
                </>
              );
            })}
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
