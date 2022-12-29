import { Box } from "./Box.js";
import { makeStyles } from "@mui/styles";
import Dan from "../../images/dan.jpg";

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

function Post({}) {
  const classes = useStyles();
  const fakeImages = [<img className={classes.images} src={Dan} alt="Ben" />];
  return (
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
      {/* should apply this comment section */}
      {/* {fakeData.map((object, index) => (
        <div className={classes.post} key={index}>
          TODO: add a post title and time picker
          <div className={classes.author}>Author : {object.author}</div>
          <div className={classes.address}>Address : {object.address}</div>
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
          //<div className={classes.images}>{object.images}</div>
        </div>
      ))} */}
      <div className={classes.allPost}>
        {fakeData.map((object, index) => (
          <div className={classes.post}>
            <div className={classes.author}>Author : {object.author}</div>
            <div className={classes.address}>Address : {object.address}</div>
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
            {fakeImages.map((item, id) => item)}
          </div>
        ))}
      </div>
    </Box>
  );
}
export default Post;

const fakeData = [
  {
    id: "1",
    address: "aaaaaaaaaaa",
    latitude: "111111111",
    longitude: "1111111111",
    time: "20221229",
    description: "test aaaaaaaaaaaaaa",
    tags: ["a", "aa", "aaa", "aaaa"],
    images: "qqqqqqqq",
    author: "wilson",
  },
  {
    id: "2",
    address: "bbbbbbbb",
    latitude: "2222222222",
    longitude: "2222222",
    time: "20221229",
    description: "test bbbbbbbb",
    tags: ["b", "bb", "bbb", "bbbb"],
    images: "zzzzzzzzz",
    author: "Durant",
  },
  {
    id: "3",
    address: "ccccccccc",
    latitude: "333",
    longitude: "3333333333",
    time: "20221229",
    description: "test cccccccccc",
    tags: ["c", "cc", "ccc", "ccccc"],
    images: "ccccccccccc",
    author: "irving",
  },
  {
    id: "4",
    address: "aaaaaaaaaaa",
    latitude: "111111111",
    longitude: "2222222",
    time: "20221229",
    description: "test aaaaaaaaaaaaaa",
    tags: ["a", "aa", "aaa", "aaaa"],
    images: "qqqqqqqq",
    author: "wilson",
  },
  {
    id: "1",
    address: "aaaaaaaaaaa",
    latitude: "111111111",
    longitude: "2222222",
    time: "20221229",
    description: "test aaaaaaaaaaaaaa",
    tags: ["a", "aa", "aaa", "aaaa"],
    images: "qqqqqqqq",
    author: "wilson",
  },
  {
    id: "1",
    address: "aaaaaaaaaaa",
    latitude: "111111111",
    longitude: "2222222",
    time: "20221229",
    description: "test aaaaaaaaaaaaaa",
    tags: ["a", "aa", "aaa", "aaaa"],
    images: "qqqqqqqq",
    author: "wilson",
  },
];
