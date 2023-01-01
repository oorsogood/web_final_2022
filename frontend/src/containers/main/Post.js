import { Box } from "./Box.js";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  allPost: {
    display: "flex",
    flexWrap: "wrap",
  },
  post: {
    backgroundColor: "SpringGreen",
    color: "blue",
    border: "solid",
    margin: "10px",
    width: "350px",
    height: "300px",
  },
  tags: {
    display: "flex",
    flexDirection: "row",
  },
  eachTag: {
    marginLeft: "5px",
    marginRight: "5px",
  },
  images: {
    width: "200px",
    height: "180px",
    marginLeft: "75px",
  },
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
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
      {data.map((object, index) => (
        <div
          className={classes.post}
          key={index}
          onClick={() => ToPost(object.id)}
        >
          <div className={classes.author}>Author : {object.author}</div>
          <div className={classes.address}>
            Title(Location) : {object.location}
          </div>
          <div className={classes.time}>Time : {object.time}</div>
          <div className={classes.description}>
            Description : {object.description}
          </div>
          <div className={classes.tags}>
            Tags :
            {object.tags.map((tags, id) => (
              <div className={classes.eachTag} key={id}>
                {tags}
              </div>
            ))}
          </div>

          <img className={classes.images} src={object.images[0]} alt="images" />
        </div>
      ))}
    </Box>
  );
}
export default Post;
