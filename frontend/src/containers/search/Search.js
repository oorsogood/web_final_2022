import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "../../images/search.png";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { TagsInput } from "react-tag-input-component";
import { useSearch } from "../../hooks/useSearch";

const useStyles = makeStyles(() => ({
    searchIcon: {
        width: "25px",
        height: "25px",
        marginLeft: "5px",
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column",
    },
    enterTags: {
        color: "royalblue",
    },
}));

export default function Search(props) {
  const [open, setOpen] = useState(false);
  const {
    authorFilter,
    setAuthorFilter,
    locationFilter,
    setLocationFilter,
    tagsFilter,
    setTagsFilter,
    getPosts,
  } = useSearch();
  const [tagsOnFocus, setTagsOnFocus] = useState(false);
  const [disableSearch, setDisableSearch] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    // console.log("props is", props.myPost);
    getPosts(props.myPost);
  }, []);

  useEffect(() => {
    if (
      authorFilter.length !== 0 ||
      locationFilter.length !== 0 ||
      tagsFilter.length !== 0
    ) {
      setDisableSearch(false);
    } else {
      setDisableSearch(true);
    }
  }, [
    authorFilter,
    setAuthorFilter,
    locationFilter,
    setLocationFilter,
    tagsFilter,
    setTagsFilter,
  ]);

  const handleChangeAuthor = (e) => {
    setAuthorFilter(e.target.value);
  };
  const handleChangeLocation = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleOthersOnFocus = () => {
    setTagsOnFocus(false);
  };

  const handleTagsOnFocus = () => {
    setTagsOnFocus(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      setTagsOnFocus(false);
    }
  };
  const handleSearch = (event, reason) => {
    getPosts(false);
    if (reason !== "backdropClick") {
      setOpen(false);
      setTagsOnFocus(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Search Post
        <img className={classes.searchIcon} src={SearchIcon} alt="SearchIcon" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Find The Post!</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <div className={classes.dialogContent}>
              {props.myPost ? <></> :
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <div onFocus={handleOthersOnFocus}>
                    <TextField
                      id="filled-search"
                      label="Author"
                      type="search"
                      value={authorFilter}
                      onChange={handleChangeAuthor}
                    />
                  </div>
                </FormControl>
              }
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <div onFocus={handleOthersOnFocus}>
                  <TextField
                    id="filled-search"
                    label="Location"
                    type="search"
                    value={locationFilter}
                    onChange={handleChangeLocation}
                  />
                </div>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <div onFocus={handleTagsOnFocus}>
                  <TagsInput
                    value={tagsFilter}
                    onChange={setTagsFilter}
                    placeHolder="Your Hashtags"
                  />
                  {tagsOnFocus && (
                    <div>
                      <p className={classes.enterTags}>
                        press <b>Enter</b> to add new tag.
                      </p>
                      <p className={classes.enterTags}>
                        press <b>BackSpace</b> to remove tag.
                      </p>
                    </div>
                  )}
                </div>
              </FormControl>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={disableSearch}
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
