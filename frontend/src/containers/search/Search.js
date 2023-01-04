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
  searchButton: {
    paddingTop: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    width: "13px",
    height: "13px",
    marginLeft: "5px",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
  },
  enterTags: {
    color: "royalblue",
    fontSize: "12px",
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
  const classes = useStyles();

  useEffect(() => {
    getPosts(props.myPost);
  }, []);

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
    getPosts(props.myPost);
    if (reason !== "backdropClick") {
      setOpen(false);
      setTagsOnFocus(false);
    }
  };

  return (
    <div>
      <div className={classes.searchButton}>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          style={{
            backgroundColor: "#0000006b",
            width: "35vw",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Search Post
          <img
            className={classes.searchIcon}
            src={SearchIcon}
            alt="SearchIcon"
          />
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <b>Find The Post !</b>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              minWidth: "350px",
              minHeight: "270px",
            }}
          >
            <div className={classes.dialogContent}>
              {props.myPost ? (
                <></>
              ) : (
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <div onFocus={handleOthersOnFocus}>
                    <TextField
                      id="filled-search"
                      label="Author"
                      type="search"
                      sx={{ width: 250 }}
                      value={authorFilter}
                      onChange={handleChangeAuthor}
                    />
                  </div>
                </FormControl>
              )}
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <div onFocus={handleOthersOnFocus}>
                  <TextField
                    id="filled-search"
                    label="Location"
                    type="search"
                    sx={{ width: 250 }}
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
                    placeHolder="Tags"
                    helperText="Optional"
                  />
                  {tagsOnFocus && (
                    <div>
                      <p className={classes.enterTags}>
                        press <b>Enter</b> to add new tag.
                        <br />
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
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
