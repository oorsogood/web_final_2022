import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";
import styled from "styled-components";
import Post from "./Post";
import axios from "../../api";
import mapStyles from "../../components/MapStyles";
import { makeStyles } from "@mui/styles";
import bp1 from "../../images/bp1.jpg";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY);
const libraries = ["places"];

const useStyles = makeStyles(() => ({
  myMapPage: {
    height: "92vh",
    width: "100%",
    backgroundImage: `url(${bp1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  mapAndPostLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  post: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "400px",
    height: "600px",
    overflow: "scroll",
    // background: "red"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  helperText: {
    marginLeft: "10px",
    color: "gray",
    fontSize: "20px",
  },
}));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  width: 100%;
`;

const containerStyle = {
  width: "800px",
  height: "600px",
};

const Map = () => {
  const classes = useStyles();
  const center = useMemo(() => ({ lat: 0, lng: 0 }), []);
  const [myPosts, setMyPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const mapRef = useRef();
  const me = JSON.parse(window.localStorage.getItem("user")).username;

  const getMyPosts = async () => {
    const {
      data: { contents },
    } = await axios.get("/posts", {
      params: {
        authorFilter: me,
      },
    });
    setMyPosts(contents);
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerClick = async (e) => {
    const {
      data: { contents },
    } = await axios.get("/posts", {
      params: {
        authorFilter: me,
        coordinateFilter: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
      },
    });
    setSelectedPosts(contents);
  };

  return (
    <div className={classes.myMapPage}>
      <Wrapper>
        <div className={classes.header}>
          <h2 className={classes.title}>Where You've been to !</h2>
          <p className={classes.helperText}>(Click pins to check posts)</p>
        </div>
        <div className={classes.mapAndPostLayout}>
          <GoogleMap
            zoom={1.8}
            center={center}
            mapContainerStyle={containerStyle}
            options={{
              disableDefaultUI: true,
              styles: mapStyles,
              zoomControl: true,
            }}
            onLoad={onMapLoad}
          >
            {myPosts !== undefined && myPosts.length > 0 ? (
              myPosts.map((post, index) => {
                const coordinate = {
                  lat: post.latitude,
                  lng: post.longitude,
                };
                return (
                  <MarkerF
                    position={coordinate}
                    onClick={handleMarkerClick}
                    key={index}
                    icon={{
                      url: "/pin.png",
                      scaledSize: new window.google.maps.Size(50, 50),
                      origin: new window.google.maps.Point(-5, 8),
                      anchor: new window.google.maps.Point(25, 25),
                    }}
                  />
                );
              })
            ) : (
              <></>
            )}
          </GoogleMap>
          <div className={classes.post}>
            <Post data={selectedPosts} />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <Map />;
  }
};
