import { Box } from "./Box.js";
import { makeStyles } from "@mui/styles";

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
  return (
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
      {/* should apply this comment section */}
      {data.map((object, index) => (
        <div className={classes.post} key={index}>
          {/* TODO: add a post title and time picker */}
          <div className={classes.author}>Author : {object.author}</div>
          <div className={classes.address}>Title(Location) : {object.location}</div>
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
          {/* <div className={classes.images}> */}
            <img className={classes.images} src={object.images[0]}/>
          {/* </div> */}
        </div>
      ))}
    </Box>
  );
}
export default Post;