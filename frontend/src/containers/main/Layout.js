import Post from "./Post";
import { useSearch } from "../../hooks/useSearch";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import NoMatch from "../../components/noMatch";
import NoMatchIcon from "../../images/no-results.png";

const useStyles = makeStyles(() => ({
  mainLayout: {
    backgroundColor: "aquamarine",
  },
  contentLayout: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
  },
  NoMatchIcon: {
    width: "70px",
    height: "70px",
    marginRight: "30px",
  },
}));
const Layout = ({ children }) => {
  const { posts, getPosts } = useSearch();
  const classes = useStyles();

  return (
    <div className={classes.mainLayout}>
      {children}
      {posts === undefined ? (
        <div className={classes.contentLayout}>
          <img
            className={classes.NoMatchIcon}
            src={NoMatchIcon}
            alt="no match"
          />
          <NoMatch />
        </div>
      ) : (
        <Post data={posts} />
      )}
    </div>
  );
};

export default Layout;
