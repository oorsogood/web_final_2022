import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@mui/styles";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api";
import PostDetailsEdit from "./PostDetailsEdit";
import StaticMap from "../../components/StaticMap";
import { useAuth } from "../../hooks/useAuth";

const useStyles = makeStyles(() => ({
		title: {
			backgroundColor: "palegoldenrod",
			margin: "0"
		},
    header: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    background: {
        backgroundColor: "palegoldenrod",
        width: "100%",
        height: "100%",
				display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        top: "0",
        left: "0",
    },
		h2: {
			margin: "0"
		},
    mainPicture: {
        width: "300px",
        height: "400px",
        margin: "0",
				// background: "green"
    },
		images: {
			margin: "0",
			// position: "absolute",
			// top: "50%",
			// left: "50%",
			// // msTransform: "translate(-50%, -50%)",
			// transform: "translate(-50%, -50%)"
		},
    tags: {
        display: "flex",
        flexWrap: "wrap",
    },
    infos: {
        // marginLeft: "100px",
        // marginRight: "100px",
				margin: "0",
				// background: "blue",
				height: "620px",
				display: "flex",
				flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
		carousel: {
			width: "300px",
			height: "300px",
			// background: "red",
			margin: "0",
		},
		address: {
			width: "450px"
		}
}));

export default function PostDetails() {
    const { postId } = useParams();
    const { user } = useAuth();

    // console.log("Current post id is", postId);
    const [postInfo, setPostInfo] = useState({});
    const [coordinate, setCoordinate] = useState({
        lat: 0,
        lng: 0,
    });
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    const getPost = async () => {
        const id = String(postId.substring(1, postId.length));
        // console.log(id);
        const {
            data: { contents },
        } = await axios.get("/post", {
            params: {
                id: id,
            },
        });
        // console.log(contents[0]);
        setPostInfo(contents[0]);
        setCoordinate({
            lat: contents[0].latitude,
            lng: contents[0].longitude,
        });
    };
    useEffect(() => {
        // console.log("getPost called");
        getPost();
    }, [edit]);
    const classes = useStyles();

    const handleClickEdit = () => {
        setEdit(true);
    };

    const handleClickDelete = async () => {
        // connect delete post API
        const id = String(postId.substring(1, postId.length));
        const result = await axios.delete("/post", {
            data: {
                "token": user.token,
            },
            params: {
                id,
            },
    });
        // console.log("delete", result);
        navigate("/dashboard/home");
    };

    const currentUser = JSON.parse(window.localStorage.getItem("user"));

    return (
        <>
            {edit ? (
                <PostDetailsEdit
                    postId={postInfo.id}
                    coordinate={coordinate}
                    setEdit={setEdit}
                    editTitle={postInfo.location}
                    editDate={postInfo.time}
                    editTags={postInfo.tags}
                    editDescription={postInfo.description}
                    editImages={postInfo.images}
                    editAddress={postInfo.address}
                />
            ) : (
							<>
								<center>
									<h1 className={classes.title}>Post Details</h1>
								</center>
                <div className={classes.background}>
									<div className={classes.infos}>
										<h2 className={classes.h2}>Location : {postInfo.location}</h2>
										<h3 className={classes.title}>Author : {postInfo.author}</h3>
										<h3 className={classes.title}>Date : {new Date(postInfo.time).toDateString()}</h3>
										{postInfo.tags === undefined || postInfo.tags.length === 0 ? (
												<></>
										) : (
												<h3 className={classes.title}>
														Tags :{" "}
														<div className={classes.tags}>
																{postInfo.tags.map((tags, index) => (
																		<div key={index}>#{tags}</div>
																))}
														</div>
												</h3>
										)}
										{postInfo.description === "" ? (
												<></>
										) : (
											<div style={{ overflow: "scroll" }}>
												<h3 className={classes.title}>Description : {postInfo.description}</h3>
											</div>
										)}
										<div className={classes.mainPicture}>
											<Carousel className={classes.carousel} infiniteLoop useKeyboardArrows autoPlay showArrows={true}>
													{postInfo.images === undefined ? (
															<></>
													) : (
															postInfo.images.map((imgURL, index) => {
																	return (
																		<img src={imgURL} key={index} alt="images" />
																	)
															})
													)}
											</Carousel>
										</div>
									</div>
									<div className={classes.infos}>
										<center>
											<h2>Location on Map</h2>
										</center>
										<div className={classes.staticMap}>
											<StaticMap coordinate={coordinate} />
										</div>
										<h3 className={classes.address}>Address : {postInfo.address}</h3>
									</div>
                </div>
								<div>
									{(currentUser !== null && postInfo.author === currentUser.username) ? (
										<div>
											<Button
												variant="contained"
												color="primary"
												onClick={handleClickEdit}
											>
												Edit
											</Button>
											<Button
												variant="contained"
												color="error"
												onClick={handleClickDelete}
											>
												Delete
											</Button>
										</div>
										) : (
											<></>
									)}
									</div>
							</>
            )}
        </>
    );
}
