import { createContext, useContext, useState } from 'react';
import axios from "../api";

const SearchContext = createContext({
  posts: [],
  authorFilter: "",
  locationFilter: "",
  tagsFilter: [],
  getPosts: () => {}
});

const SearchProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [authorFilter, setAuthorFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState([]);

  const getPosts = async () => {
    // console.log("location", location);
    // console.log("tags", tags);
    // console.log(author);
    const result = await axios.get("/posts", {
      params: {
        authorFilter,
        placeFilter: locationFilter,
        tagFilter: tagsFilter
      }
    });
    // console.log(result.data.contents);
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
        getPosts
      }}
      {...props}
    />
  );
};

function useSearch() {
  return useContext(SearchContext);
}

export { SearchProvider, useSearch };
