import { useState, useEffect } from "react";
import { Navbar, Button, Link, Text, css } from "@nextui-org/react";
import Layout from "./Layout.js";
import { SearchProvider } from "../../hooks/useSearch";
import AccountIcon from "../../images/account.png";
import SavedPostIcon from "../../images/savedPost.png";
import MyPostIcon from "../../images/myPost.png";
import LogoutIcon from "../../images/logout.png";
import HomeIcon from "../../images/home.png";
import WriteIcon from "../../images/writing.png";
import { makeStyles } from "@mui/styles";
import CP3Icon from "../../images/cp3.jpg";
import Search from "../search/Search.js";

const useStyles = makeStyles(() => ({
  cp3Icon: {
    width: "35px",
    height: "35px",
  },
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

function Home() {
  const collapseItems = ["myaccount", "myposts", "savedposts", "logout"];
  const classes = useStyles();

  return (
    <SearchProvider>
      <Layout>
        <Navbar isBordered variant="sticky">
          <Navbar.Brand>
            <Navbar.Toggle aria-label="toggle navigation" />
            <img className={classes.cp3Icon} src={CP3Icon} alt="CP3LOGO" />
            <Text b color="inherit" hideIn="xs">
              Web Final Project
            </Text>
          </Navbar.Brand>
          <Navbar.Content
            enableCursorHighlight
            variant="underline"
            css={{
              position: "absolute",
              marginLeft: "250px",
            }}
          >
            <Navbar.Link href="posts" css={{ border: "10px" }}>
              <img className={classes.homeIcon} src={HomeIcon} alt="HomeIcon" />
              Home
            </Navbar.Link>
            <div className={classes.searchBar}>
              <Search />
            </div>
          </Navbar.Content>
          <Navbar.Content enableCursorHighlight variant="underline">
            <Navbar.Link isActive href="create">
              <img
                className={classes.writeIcon}
                src={WriteIcon}
                alt="WriteIcon"
              />
              Create a New Post
            </Navbar.Link>
          </Navbar.Content>
          <Navbar.Collapse>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem key={item}>
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href={item}
                >
                  {item === "myaccount" && (
                    <img
                      className={classes.myAccountIcon}
                      src={AccountIcon}
                      alt="AccountIcon"
                    />
                  )}
                  {item === "myposts" && (
                    <img
                      className={classes.myPostIcon}
                      src={MyPostIcon}
                      alt="MyPostsIcon"
                    />
                  )}
                  {item === "savedposts" && (
                    <img
                      className={classes.saveIcon}
                      src={SavedPostIcon}
                      alt="SavedPostIcon"
                    />
                  )}
                  {item === "logout" && (
                    <img
                      className={classes.logoutIcon}
                      src={LogoutIcon}
                      alt="LogoutIcon"
                    />
                  )}
                  {item === "myaccount" && "My Account"}
                  {item === "myposts" && "My Posts"}
                  {item === "savedposts" && "Saved Posts"}
                  {item === "logout" && "Log Out"}
                </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </Layout>
    </SearchProvider>
  );
}
export default Home;
