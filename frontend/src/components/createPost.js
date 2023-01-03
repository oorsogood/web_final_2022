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
import { useAuth } from "../hooks/useAuth";
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
    tags: {
        width: "350px",
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
    );
};

const CreatePost = () => {
    // const user = JSON.parse(window.localStorage.getItem("user"));
    // console.log("User is", user.username);
    const { location, setLocation, address, latitude, longitude } = useMap();
    const classes = useStyles();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImgRaw, setSelectedImgRaw] = useState([]);
    // const [dateInput, setDateInput] = useState({
    //   $D: 0, //Date
    //   $H: 0, // Hour
    //   $L: "en", // Language
    //   $M: 0, // Month, need to plus 1 to get the correct month, E.g. 0 represents January
    //   $W: 0, // Week
    //   $d: {}, // an object contain all the time info {Thu Sep 01 2022 00:00:00 GMT+0800 (Taipei Standard Time)}
    //   $m: 0, // Minutes
    //   $ms: 0, // unknown attribute
    //   $s: 0, // Seconds
    //   $u: undefined,
    //   $x: {},
    //   $y: 0, // Year
    // });
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
            // selectedImages.length !== 0 &&
            // content.length !== 0 &&
            // tags.length !== 0
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
        // console.log("Date is", dateInput);
        const time = dateInput.$d;
        // console.log("dateInput.$d.toISOString() is", dateInput.$d.toISOString());
        // console.log("type of dateInput.$d.toISOString() is", typeof(dateInput.$d.toISOString()));
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
            formdata.append("token", user.token);
            const result = await axios.post("./uploadImg", formdata);
            imgURL.push(result.data);
        }

        // console.log("time is", time);
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
            token: user.token,
        });
        // console.log(newPost);
        navigate("/dashboard/home");
    };

    useEffect(() => {
        setPostTitle(location);
    }, [location]);

    return (
        <div>
            <center>
                <h1 className={classes.title}>Create a New Post!</h1>
            </center>
            <div>
                <div className={classes.date}>
                    <ResponsiveDatePicker
                        dateInput={dateInput}
                        setDateInput={setDateInput}
                    />
                </div>
                <div className={classes.map}>
                    <h2>Search On Map</h2>
                    <GoogleMaps />
                </div>
                <div>
                    <h2>Location</h2>
                    <div className={classes.PostTitle} onFocus={handleOthersOnFocus}>
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
            <div>
                <h2>Add HashTags</h2>
                <div className={classes.tags} onFocus={handleTagsOnFocus}>
                    <TagsInput
                        value={tags}
                        onChange={setTags}
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
            <div>Address: {address}</div>
            <div>
                <br />
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
        </div>
    );
};

export default CreatePostPage;
