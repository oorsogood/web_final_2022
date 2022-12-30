import Post from "./Post";
import { Box } from "./Box.js";

export const Layout = ({ children }) => (
  <Box
    css={{
      maxW: "100%",
    }}
  >
    {children}
    <Post fakeData={fakeData} />
  </Box>
);

const fakeData = [
  {
    id: "1",
    address: "aaaaaaaaaaa",
    latitude: "111111111",
    longitude: "1111111111",
    time: "20221229",
    description: "test aaaaaaaaaaaaaa",
    tags: ["a", "aa", "aaa", "aaaa"],
    images: "qqqqqqqq",
    author: "wilson",
  },
  {
    id: "2",
    address: "bbbbbbbb",
    latitude: "2222222222",
    longitude: "2222222",
    time: "20221229",
    description: "test bbbbbbbb",
    tags: ["b", "bb", "bbb", "bbbb"],
    images: "zzzzzzzzz",
    author: "Durant",
  },
  {
    id: "3",
    address: "ccccccccc",
    latitude: "333",
    longitude: "3333333333",
    time: "20221229",
    description: "test cccccccccc",
    tags: ["c", "cc", "ccc", "ccccc"],
    images: "ccccccccccc",
    author: "irving",
  },
  {
    id: "4",
    address: "aaaaaaaaaaa",
    latitude: "111111111",
    longitude: "2222222",
    time: "20221229",
    description: "test aaaaaaaaaaaaaa",
    tags: ["a", "aa", "aaa", "aaaa"],
    images: "qqqqqqqq",
    author: "wilson",
  },
  {
    id: "1",
    address: "aaaaaaaaaaa",
    latitude: "111111111",
    longitude: "2222222",
    time: "20221229",
    description: "test aaaaaaaaaaaaaa",
    tags: ["a", "aa", "aaa", "aaaa"],
    images: "qqqqqqqq",
    author: "wilson",
  },
  {
    id: "1",
    address: "aaaaaaaaaaa",
    latitude: "111111111",
    longitude: "2222222",
    time: "20221229",
    description: "test aaaaaaaaaaaaaa",
    tags: ["a", "aa", "aaa", "aaaa"],
    images: "qqqqqqqq",
    author: "wilson",
  },
];
