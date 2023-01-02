import React from "react";
import Home from "../main/Home";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  mainLayout: {
    backgroundColor: "aquamarine",
  },
}));

export default function MyPosts() {
  const classes = useStyles();
  return (
    <div className={classes.mainLayout}>
      <Home myPost={true} />
    </div>
  );
}
