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
import ResponsiveDatePicker from "../../components/DatePicker";
import { useAuth } from "../../hooks/useAuth";

const useStyles = makeStyles(() => ({
    header: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
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
    infos: {
        marginLeft: "180px",
        marginRight: "180px",
    },
}));

export default function PostDetailsEdit(props) {
    const classes = useStyles();
    const { postId } = useParams();
    const { user } = useAuth();
    const [editTitle, setEditTitle] = useState(props.editTitle);

    const [editDate, setEditDate] = useState(props.editDate);
    const [editTags, setEditTags] = useState(props.editTags);
    const [editDescription, setEditDescription] = useState(props.editDescription);
    const [editImages, setEditImages] = useState(props.editImages);
    const [tagsOnFocus, setTagsOnFocus] = useState(false);

    const [selectedImages, setSelectedImages] = useState([...editImages]);
    const [selectedImgRaw, setSelectedImgRaw] = useState([]);

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
        const id = String(postId.substring(1, postId.length));
        const imgURL = [...editImages];
        for (const img of selectedImgRaw) {
            var formdata = new FormData();
            formdata.append("image", img);
            // formdata.append("token", user.token);
            const result = await axios.post("./uploadImg", formdata);
            imgURL.push(result.data);
        }
        const time = editDate.$d;
        const result = await axios.patch("/post", {
            id,
            location: editTitle,
            time: time === undefined ? editDate : time.toISOString(),
            tags: editTags,
            description: editDescription,
            images: imgURL,
            token: user.token,
        });
        // console.log("result is", result);
        // edit API here
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
            <div>
                <div className={classes.header}>
                    <h1>Edit Post Details</h1>
                    <div>
                        <div>
                            <Button variant="contained" onClick={() => props.setEdit(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleClickSave}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.infos}>
                    <div className={classes.date}>
                        <h2>Date</h2>
                        <ResponsiveDatePicker
                            dateInput={editDate}
                            setDateInput={setEditDate}
                        />
                    </div>
                    <div className={classes.PostTitle}>
                        <h2>Location</h2>
                        <div onFocus={handleOthersOnFocus}>
                            <TextField
                                label="Name of Location?"
                                variant="outlined"
                                value={editTitle}
                                onChange={handleChangeEditTitle}
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
                                                    onClick={() => {
                                                        setSelectedImages(
                                                            selectedImages.filter((e) => e !== img)
                                                        );
                                                        setEditImages(editImages.filter((e) => e !== img));
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
                </div>
                <div className={classes.infos}>
                    <h2>HashTags</h2>
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
                    <h2>Any Idea?</h2>
                    <div onFocus={handleOthersOnFocus}>
                        <TextField
                            label="What's on your mind?"
                            multiline
                            fullWidth
                            rows={4}
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
