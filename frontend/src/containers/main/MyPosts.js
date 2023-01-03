import React from "react";
import Home from "./Home";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  myPostLayout: {
    backgroundColor: "aquamarine",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
