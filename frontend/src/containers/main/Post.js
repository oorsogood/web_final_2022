import { Box } from "./Box.js";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import noImageIcon from "../../images/no-image.png";

const useStyles = makeStyles(() => ({
  mainLayout: {
    marginLeft: "85px",
  },
  allPost: {
    display: "flex",
    flexWrap: "wrap",
  },
  post: {
    backgroundColor: "SpringGreen",
    borderRadius: "10px",
    margin: "10px",
    width: "300px",
    height: "250px",
  },
  tags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  eachTag: {
    marginLeft: "5px",
    marginRight: "5px",
    color: "sienna",
  },
  iamgesLayout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "15px",
  },
  images: {
    width: "180px",
    height: "150px",
  },
  locationLayout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  location: { fontSize: "23px", color: "navy" },
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
            {object.images.length === 0 ? (
              <div className={classes.iamgesLayout}>
                <img
                  className={classes.images}
                  src={noImageIcon}
                  alt="images"
                />
              </div>
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
              <div className={classes.locationLayout}>
                <b className={classes.location}>{object.location}</b>
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
