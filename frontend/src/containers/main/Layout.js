import Post from "./Post";
import { Box } from "./Box.js";
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
      <Box
        css={{
          maxW: "100%",
        }}
      >
        {children}
        {posts === undefined ? (
          <div>No matching results</div>
        ) : (
          <Post data={posts} />
        )}
      </Box>
    </div>
  );
};

export default Layout;
