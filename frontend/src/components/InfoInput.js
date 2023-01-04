import { React } from "react";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import trashIcon from "../images/trash.png";
import { TagsInput } from "react-tag-input-component";
import ResponsiveDatePicker from "../components/DatePicker";

const useStyles = makeStyles(() => ({
  h2: {
    margin: "5px",
  },
  requiredField: {
    margin: "0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trashIcon: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  imageSection: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
    height: "150px",
  },
  uploadImage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "2%",
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
    transform: "translate(-50%, 70%)",
  },
  deleteButton: {
    margin: "0",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "transparent",
    position: "absolute",
    right: "0%",
    transform: "translate(0%, 20%)",
  },
  indexAndDeleteIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  error: {
    textAlign: "center",
    margin: "0",
  },
  tags: {
    width: "600px",
  },
  enterTags: {
    color: "royalblue",
    margin: "0",
  },
  tagInput: {
    maxWidth: "600px",
  },
  rightLayout: {
    width: "600px",
    height: "600px",
    margin: "0",
  },
}));

const InfoInput = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.rightLayout}>
      <div className={classes.requiredField}>
        <div className={classes.date}>
          <h2 className={classes.h2}>Date *</h2>
          <ResponsiveDatePicker
            dateInput={props.dateInput}
            setDateInput={props.setDateInput}
          />
        </div>
        <div>
          <h2 className={classes.h2}>Location *</h2>
          <div
            className={classes.PostTitle}
            onFocus={props.handleOthersOnFocus}
          >
            <TextField
              label="Where are you?"
              variant="outlined"
              value={props.postTitle}
              onChange={props.handleChangePostTitle}
              style={{ width: "300px", background: "white" }}
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
            onChange={props.onSelectFile}
            onClick={(event) => {
              event.target.value = null;
            }}
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
        {props.selectedImages.length > 0 &&
          (props.selectedImages.length > 10 ? (
            <p className={classes.error}>
              You can't upload more than <b>10</b> images! Please delete{" "}
              <b>{props.selectedImages.length - 10}</b> images.
              {/* <br />
							<span>
								Please delete <b>{props.selectedImages.length - 10}</b> images.
							</span> */}
            </p>
          ) : (
            <></>
          ))}
        <div className={classes.imageSection}>
          {props.selectedImages &&
            props.selectedImages.map((img, index) => {
              return (
                <div key={index} className={classes.images}>
                  <img src={img} alt="uploadFile" height="100" />
                  <div className={classes.indexAndDeleteIcon}>
                    <b className={classes.imageIndex}>{index + 1}</b>
                    <button
                      className={classes.deleteButton}
                      onClick={() => {
                        props.setSelectedImages(
                          props.selectedImages.filter((e, i) => i !== index)
                        );
                        props.setSelectedImgRaw(
                          props.selectedImgRaw.filter((e, i) => i !== index)
                        );
                      }}
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
        <div onFocus={props.handleOthersOnFocus}>
          <TextField
            multiline
            rows={2}
            value={props.content}
            onChange={props.handleChangeContent}
            style={{ width: "600px", overflow: "scroll", background: "white" }}
          />
        </div>
      </div>
      <div>
        <h2 className={classes.h2}>Hashtags</h2>
        <div className={classes.tags} onFocus={props.handleTagsOnFocus}>
          <TagsInput
            value={props.tags}
            onChange={props.setTags}
            classNames={{ tag: "tag-cls", input: classes.tagInput }}
          />
          {props.tagsOnFocus && (
            <div>
              <p className={classes.enterTags}>
                Press <b>Enter</b> to add new tags and press <b>Backspace</b> to
                remove.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoInput;
