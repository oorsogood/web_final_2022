import { createContext, useContext, useState } from "react";
import axios from "../api";

const SearchContext = createContext({
  posts: [],
  authorFilter: "",
  locationFilter: "",
  tagsFilter: [],
  getPosts: (myPost) => {},
});

const SearchProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [authorFilter, setAuthorFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState([]);

  const getPosts = async (myPost) => {
    const author = myPost
      ? JSON.parse(window.localStorage.getItem("user")).username
      : authorFilter;
    const result = await axios.get("/posts", {
      params: {
        authorFilter: author,
        placeFilter: locationFilter,
        tagFilter: tagsFilter,
      },
    });
    setPosts(result.data.contents);
  };

  return (
    <SearchContext.Provider
      value={{
        posts,
        authorFilter,
        setAuthorFilter,
        locationFilter,
        setLocationFilter,
        tagsFilter,
        setTagsFilter,
        getPosts,
      }}
      {...props}
    />
  );
};

function useSearch() {
  return useContext(SearchContext);
}

export { SearchProvider, useSearch };
