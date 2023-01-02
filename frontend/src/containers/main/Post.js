import { Box } from "./Box.js";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
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
  iamgesLayout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15px",
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
  location: { fontSize: "20px", color: "navy" },
  authorLayout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  author: {
    color: "darkviolet",
  },
  dateLayout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    color: "palevioletred",
  },
}));

function Post({ data }) {
  const classes = useStyles();
  const { user } = useAuth();
  // console.log(data);
  const navigate = useNavigate();

  const ToPost = (postId) => {
    if (user) {
      navigate("/dashboard/posts/:" + postId);
    } else {
      navigate("/posts/:" + postId);
    }
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
            <div className={classes.locationLayout}>
              <b className={classes.location}>{object.location}</b>
            </div>
            <div className={classes.authorLayout}>
              <div className={classes.author}>{object.author}</div>
            </div>
            <div className={classes.dateLayout}>
              <div className={classes.date}>
                {new Date(object.time).toDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Post;
