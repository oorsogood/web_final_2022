import React from "react";
import Home from "./Home";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  myPostLayout: {
    backgroundColor: "#F6F5F2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
}));

export default function MyPosts() {
  const classes = useStyles();
  return (
    <div className={classes.myPostLayout}>
      <Home myPost={true} />
    </div>
  );
}
