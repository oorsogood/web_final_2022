import { createContext, useContext, useState } from 'react';
import axios from "../api";

const SearchContext = createContext({
  posts: [],
  author: "",
  location: "",
  tags: [],
  getPosts: () => {}
});

const SearchProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState([]);

  const getPosts = async () => {
    // console.log("location", location);
    // console.log("tags", tags);
    const result = await axios.get("/posts", {
      params: {
        authorFilter: author,
        placeFilter: location,
        tagFilter: tags
      }
    });
    // console.log(result.data.contents);
    setPosts(result.data.contents);
  };

  return (
    <SearchContext.Provider
      value={{
        posts,
        author,
        setAuthor,
        location,
        setLocation,
        tags,
        setTags,
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
