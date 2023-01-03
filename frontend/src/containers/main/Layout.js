import Post from "./Post";
import { useSearch } from "../../hooks/useSearch";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  mainLayout: {
    backgroundColor: "aquamarine",
  },
}));
const Layout = ({ children }) => {
  const { posts, getPosts } = useSearch();
  const classes = useStyles();

  // useEffect(() => {
  //     getPosts();
  // }, []);

  return (
    <div className={classes.mainLayout}>
      {children}
      {posts === undefined ? (
        <div>No matching results</div>
      ) : (
        <Post data={posts} />
      )}
    </div>
  );
};

export default Layout;
