import { useState, useEffect } from "react";
import { Navbar, Button, Link, Text, css } from "@nextui-org/react";
import Layout from "./Layout.js";
import { SearchProvider } from "../../hooks/useSearch";
import { makeStyles } from "@mui/styles";
import Search from "../search/Search.js";

const useStyles = makeStyles(() => ({
  myAccountIcon: {
    width: "30px",
    height: "30px",
    marginLeft: "-3px",
    marginRight: "10px",
  },
  myPostIcon: {
    width: "30px",
    height: "30px",
    marginRight: "7px",
  },
  saveIcon: {
    width: "30px",
    height: "30px",
    marginLeft: "-5px",
    marginRight: "12px",
  },
  logoutIcon: {
    width: "30px",
    height: "30px",
    marginRight: "8px",
  },
  homeIcon: {
    width: "25px",
    height: "25px",
    marginRight: "5px",
  },
  searchBar: {
    marginTop: "5px",
  },
  writeIcon: {
    width: "25px",
    height: "25px",
    marginRight: "5px",
  },
}));

function Home(props) {
  const collapseItems = ["myaccount", "myposts", "savedposts", "logout"];
  const classes = useStyles();

  return (
    <SearchProvider>
      <Layout>
        <div className={classes.searchBar}>
          <Search myPost={props.myPost} />
        </div>
      </Layout>
    </SearchProvider>
  );
}
export default Home;
