import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";
import Geocode from "react-geocode";
import styled from 'styled-components';
import Post from "./Post";
import axios from "../../api";
import mapStyles from "../../components/mapStyles";

Geocode.setApiKey("AIzaSyAHF2g9DJCIVmb-JwS0xL4teZiCrLXM6I8");
const libraries = ["places"];

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const containerStyle = {
    width: '600px',
    height: '600px'
};

const Map = () => {
    const center = useMemo(() => ({ lat: 0, lng: 0 }), []);
    const [myPosts, setMyPosts] = useState([]);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const mapRef = useRef();
    const me = JSON.parse(window.localStorage.getItem("user")).username;
    const dummyRef = useRef();

    const getMyPosts = async () => {
      const { data: { contents } } = await axios.get("/posts", {
        params: {
          authorFilter: me
        }
      });
      console.log("Get result is ", contents);
      setMyPosts(contents);
    };

    useEffect(() => {
      getMyPosts();
    }, []);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const handleMarkerClick = async (e) => {
      const { data: { contents } } = await axios.get("/posts", {
        params: {
          authorFilter: me,
          coordinateFilter: {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          }
        }
      });
      console.log("Get result is ", contents);
      setSelectedPosts(contents); 
    };

    return (
        <Wrapper>
            <div ref={dummyRef} />
            <GoogleMap
                zoom={1.2}
                center={center}
                mapContainerStyle={containerStyle}
                options={{ disableDefaultUI: true, styles: mapStyles }}
                // onClick={handleClick}
                onLoad={onMapLoad}
            >
              {(myPosts !== undefined && myPosts.length > 0) ?
                myPosts.map((post, index) => {
                  const coordinate = {
                    lat: post.latitude,
                    lng: post.longitude
                  };
                  return <MarkerF position={coordinate} onClick={handleMarkerClick} key={index} />
                }) :
                <></>
              }
            </GoogleMap>
            <Post data={selectedPosts} />
        </Wrapper>
    )
}

export default () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAHF2g9DJCIVmb-JwS0xL4teZiCrLXM6I8",
        libraries
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return <Map />;
    }
}