import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import noImageIcon from "../../images/no-image.png";
import { Divider } from "@mui/material";
import authorIcon from "../../images/author.png";
import tagIcon from "../../images/tag.png";

const useStyles = makeStyles(() => ({
  allPost: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "35px",
    marginRight: "35px",
    marginTop: "1%",
  },
  post: {
    backgroundColor: "#cfe2e1",
    borderRadius: "10px",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    marginTop: "1.25%",
    marginBottom: "1.25%",
    width: "36vh",
    height: "36vh",
    WebkitTransition: "all .2s ease-in-out",
    transition: "all .2s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      WebkitTrasition: "scale(1.05)",
      msTransform: "scale(1.05)",
      transform: "scale(1.05)",
      boxShadow: "3px 4.5px 2.1px #C7C7C7",
    },
  },
  iamgesLayout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  images: {
    width: "100%",
    height: "23vh",
    borderRadius: "10px",
  },
  locationLayout: {
    display: "flex",
    alignItems: "left",
    marginLeft: "10px",
  },
  location: {
    fontSize: "18px",
    color: "black",
    height: "3.7vh",
    overflow: "scroll",
  },
  authorLayout: {
    display: "flex",
    alignItems: "left",
  },
  author: {
    marginLeft: "5px",
    color: "#3c3c8a",
  },
  authorIcon: {
    width: "20px",
    height: "20px",
  },
  tagsLayout: {
    display: "flex",
    marginRight: "0.5%",
  },
  tagIcon: {
    width: "20px",
    height: "20px",
  },
  tags: {
    marginLeft: "5px",
    color: "darkred",
    maxWidth: "10vh",
    overflow: "scroll",
  },
  authorAndTagLayout: {
    marginTop: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateLayout: {
    display: "flex",
    alignItems: "left",
    marginTop: "5px",
    marginLeft: "10px",
  },
  date: {
    color: "gray",
  },
}));

function Post({ data }) {
  const classes = useStyles();
  const { user } = useAuth();
  const navigate = useNavigate();

  const ToPost = (postId) => {
    if (user) {
      navigate("/dashboard/posts/:" + postId);
    } else {
      navigate("/posts/:" + postId);
    }
  };

  return (
    <div className={classes.allPostLayout}>
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

            <div className={classes.dateLayout}>
              <div className={classes.date}>
                {new Date(object.time).toDateString()}
              </div>
            </div>
            <div className={classes.locationLayout}>
              <b className={classes.location}>{object.location}</b>
            </div>
            <Divider
              sx={{ borderBottomWidth: 2 }}
              style={{
                marginTop: "0.5%",
                marginBottom: "0",
                background: "lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <div className={classes.authorAndTagLayout}>
              <div className={classes.authorLayout}>
                <img
                  src={authorIcon}
                  className={classes.authorIcon}
                  alt="author"
                />
                <div className={classes.author}>{object.author}</div>
              </div>
              {object.tags.length !== 0 ? (
                <div className={classes.tagsLayout}>
                  <img src={tagIcon} className={classes.tagIcon} alt="tag" />
                  <div className={classes.tags}>{object.tags[0]}</div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Post;
