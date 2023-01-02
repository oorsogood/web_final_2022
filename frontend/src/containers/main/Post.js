import { Box } from "./Box.js";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  mainLayout: {
    marginLeft: "55px",
  },
  allPost: {
    display: "flex",
    flexWrap: "wrap",
  },
  post: {
    backgroundColor: "SpringGreen",
    borderRadius: "10px",
    color: "blue",
    border: "solid",
    margin: "10px",
    width: "350px",
    height: "300px",
  },
  tags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  eachTag: {
    marginLeft: "5px",
    marginRight: "5px",
  },
  iamgesLayout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "25px",
  },
  images: {
    width: "200px",
    height: "180px",
  },
  descriptionLayout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  description: { fontSize: "23px" },
}));

function Post({ data }) {
  const classes = useStyles();
  // console.log(data);
  const navigate = useNavigate();

  const ToPost = (postId) => {
    navigate("/dashboard/posts/:" + postId);
    // console.log(postId, "success");
  };

  return (
    <div className={classes.mainLayout}>
      <div className={classes.allPost}>
        {data.map((object, index) => (
          <div
            className={classes.post}
            key={index}
            onClick={() => ToPost(object.id)}
          >
            {/* <div className={classes.address}>{object.location}</div> */}
            {/* <div className={classes.author}>Author : {object.author}</div> */}
            {/* <div className={classes.time}>
            {new Date(object.time).toDateString()}
          </div> */}

            {object.images.length === 0 ? (
              <></>
            ) : (
              <div className={classes.iamgesLayout}>
                <img
                  className={classes.images}
                  src={object.images[0]}
                  alt="images"
                />
              </div>
            )}
            {object.description === "" ? (
              <></>
            ) : (
              <div className={classes.descriptionLayout}>
                <div className={classes.description}>{object.description}</div>
              </div>
            )}
            {object.tags.length === 0 ? (
              <></>
            ) : (
              <div className={classes.tags}>
                {object.tags.map((tags, id) => (
                  <div className={classes.eachTag} key={id}>
                    #{tags}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Post;
