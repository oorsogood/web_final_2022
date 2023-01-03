import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";
import styled from "styled-components";
import Post from "./Post";
import axios from "../../api";
import mapStyles from "../../components/MapStyles";
import { makeStyles } from "@mui/styles";

Geocode.setApiKey("AIzaSyAHF2g9DJCIVmb-JwS0xL4teZiCrLXM6I8");
const libraries = ["places"];

const useStyles = makeStyles(() => ({
  myMapPage: {
    backgroundColor: "#F6F5F2",
    height: "91vh"
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
    overflow: "scroll"
    // background: "red"
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
    // console.log("Get result is ", contents);
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
    // console.log("Get result is ", contents);
    setSelectedPosts(contents);
  };

  return (
    <div className={classes.myMapPage}>
      <Wrapper>
        <center>
          <h2>Where You've been to ! (Click pins to check posts)</h2>
        </center>
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
            // onClick={handleClick}
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
                // return <MarkerF position={coordinate} onClick={handleMarkerClick} key={index} />
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
    googleMapsApiKey: "AIzaSyAHF2g9DJCIVmb-JwS0xL4teZiCrLXM6I8",
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <Map />;
  }
};
