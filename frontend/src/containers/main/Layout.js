import Post from "./Post";
import { Box } from "./Box.js";
import { useSearch } from "../../hooks/useSearch";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
    const { posts, getPosts } = useSearch();

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Box
            css={{
                maxW: "100%",
            }}
        >
            {children}
            {(posts === undefined) ? <div>No matching results</div> : <Post data={posts} />}
        </Box>
    );
};

export default Layout;