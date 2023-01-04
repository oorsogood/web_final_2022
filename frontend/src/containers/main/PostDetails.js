import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@mui/styles";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api";
import PostDetailsEdit from "./PostDetailsEdit";
import StaticMap from "../../components/StaticMap";
import { TextField } from "@mui/material";
import bp1 from "../../images/bp1.jpg";
import { useAuth } from "../../hooks/useAuth";

const useStyles = makeStyles(() => ({
  postDetail: {
    width: "100%",
    height: "92vh",
    backgroundImage: `url(${bp1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  title: {
    margin: "0",
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  background: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    top: "0",
    left: "0",
  },
  h2: {
    marginLeft: "0vw",
    fontSize: "22px",
  },
  mainPicture: {
    width: "300px",
    height: "400px",
    margin: "0",
  },
  images: {
    margin: "0",
  },
  tagsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    fontSize: "20px",
  },
  tags: {
    marginLeft: "0.3vw",
  },
  infos: {
    margin: "0",
    height: "620px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
  },
  attributes: {
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
  },
  description: {
    display: "flex",
    alignItems: "flex-start",
  },
  attributesInfo: {
    marginLeft: "0.5vw",
    fontSize: "22px",
  },
  carousel: {
    width: "270px",
    height: "270px",
    margin: "0",
  },
  address: {
    width: "450px",
  },
  bottomLayout: {
    position: "absolute",
    left: "50%",
    bottom: "3vh",
    transform: "translate(-50%, 0%)",
    width: "17%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default function PostDetails() {
  const { postId } = useParams();
  const { user } = useAuth();

  const [postInfo, setPostInfo] = useState({});
  const [coordinate, setCoordinate] = useState({
    lat: 0,
    lng: 0,
  });
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const getPost = async () => {
    const id = String(postId.substring(1, postId.length));
    const {
      data: { contents },
    } = await axios.get("/post", {
      params: {
        id: id,
      },
    });
    setPostInfo(contents[0]);
    setCoordinate({
      lat: contents[0].latitude,
      lng: contents[0].longitude,
    });
  };
  useEffect(() => {
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
        token: user.token,
      },
      params: {
        id,
      },
    });
    console.log("delete", result);
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
        <div className={classes.postDetail}>
          <center>
            <h1 className={classes.title}>Post Details</h1>
          </center>
          <div className={classes.background}>
            <div className={classes.infos}>
              <div className={classes.attributes}>
                <h3 className={classes.h2}>Location :</h3>
                <div className={classes.attributesInfo}>
                  {postInfo.location}
                </div>
              </div>
              <div className={classes.attributes}>
                <h3 className={classes.title}>Author :</h3>
                <div className={classes.attributesInfo}>{postInfo.author}</div>
              </div>
              <div className={classes.attributes}>
                <h3 className={classes.title}>Date :</h3>
                <div className={classes.attributesInfo}>
                  {new Date(postInfo.time).toDateString()}
                </div>
              </div>
              {postInfo.tags === undefined || postInfo.tags.length === 0 ? (
                <></>
              ) : (
                <div className={classes.attributes}>
                  <h3 className={classes.title}>Tags :</h3>
                  <div className={classes.tagsWrapper}>
                    {postInfo.tags.map((tags, index) => (
                      <div className={classes.tags} key={index}>
                        #{tags}{" "}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {postInfo.description === "" ? (
                <></>
              ) : (
                <div className={classes.description}>
                  <h3 className={classes.title}>Description :</h3>
                  <TextField
                    multiline
                    rows={2}
                    value={postInfo.description}
                    InputProps={{ disableUnderline: true }}
                    variant="standard"
                    inputProps={{ readOnly: true }}
                    style={{
                      width: "15vw",
                      overflow: "scroll",
                      marginLeft: "1vw",
                    }}
                  />
                </div>
              )}
              {postInfo.images === undefined || postInfo.images.length === 0 ? (
                <></>
              ) : (
                <div className={classes.mainPicture}>
                  <Carousel
                    className={classes.carousel}
                    infiniteLoop
                    useKeyboardArrows
                    autoPlay
                    showArrows={true}
                  >
                    {postInfo.images === undefined ? (
                      <></>
                    ) : (
                      postInfo.images.map((imgURL, index) => {
                        return <img src={imgURL} key={index} alt="images" />;
                      })
                    )}
                  </Carousel>
                </div>
              )}
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
            {currentUser !== null &&
            postInfo.author === currentUser.username ? (
              <center className={classes.bottomLayout}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClickDelete}
                  sx={{
                    color: "white",
                    bgcolor: "#a92020",
                    ":hover": {
                      bgcolor: "#a92020",
                    },
                  }}
                >
                  Delete
                </Button>
              </center>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
}
