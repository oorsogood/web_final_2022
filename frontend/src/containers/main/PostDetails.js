import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import axios from "../../api";
import PostDetailsEdit from "./PostDetailsEdit";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-around",
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
}));

export default function PostDetails() {
  const { postId } = useParams();
  // console.log("Current post id is", postId);
  const [postInfo, setPostInfo] = useState({});
  const [edit, setEdit] = useState(false);

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
  };
  useEffect(() => {
    if (Object.keys(postInfo).length === 0) {
      getPost();
    }
  }, []);
  const classes = useStyles();

  const handleClickEdit = () => {
    setEdit(true);
  };

  const handleClickDelete = () => {
    // connect delete post API
    console.log("delete");
  };

  console.log("postinfo", postInfo);

  return (
    <>
      {edit ? (
        <PostDetailsEdit
          postId={postInfo.id}
          setEdit={setEdit}
          editTitle={postInfo.title}
          // editDate={postInfo.time}
          editTags={postInfo.tags}
          editDescription={postInfo.description}
          editImages={postInfo.images}
          editAddress={postInfo.address}
        />
      ) : (
        <div className={classes.background}>
          <div className={classes.header}>
            <h1>PostDetails</h1>
            <div>
              {postInfo.author ===
              JSON.parse(window.localStorage.getItem("user")).username ? (
                <>
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
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <h2>Title: {postInfo.title}</h2>
          <h2>Author: {postInfo.author}</h2>
          <h2>Date: {postInfo.time}</h2>
          <h2>
            Tags :{" "}
            <div className={classes.tags}>
              {postInfo.tags === undefined ? (
                <></>
              ) : (
                postInfo.tags.map((tags, index) => (
                  <div key={index}>{tags}. </div>
                ))
              )}
            </div>
          </h2>
          <h3>Description: {postInfo.description}</h3>
          <div className={classes.mainPicture}>
            <Carousel infiniteLoop useKeyboardArrows autoPlay showArrows={true}>
              {postInfo.images === undefined ? (
                <></>
              ) : (
                postInfo.images.map((imgURL, index) => {
                  return <img src={imgURL} key={index} alt="images" />;
                })
              )}
            </Carousel>
            <h3>Address : {postInfo.address}</h3>
          </div>
        </div>
      )}
    </>
  );
}
