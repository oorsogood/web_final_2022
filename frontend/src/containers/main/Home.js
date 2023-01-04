import Layout from "./Layout.js";
import { SearchProvider } from "../../hooks/useSearch";
import { makeStyles } from "@mui/styles";
import Search from "../search/Search.js";

const useStyles = makeStyles(() => ({
  myPostIcon: {
    width: "30px",
    height: "30px",
    marginRight: "7px",
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
  writeIcon: {
    width: "25px",
    height: "25px",
    marginRight: "5px",
  },
}));

function Home(props) {
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
