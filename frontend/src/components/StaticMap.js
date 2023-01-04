import { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";
import styled from "styled-components";
import mapStyles from "./MapStyles";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY);
const libraries = ["places"];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const containerStyle = {
  width: "450px",
  height: "450px",
};

const Map = (props) => {
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <Wrapper>
      <GoogleMap
        zoom={15}
        center={props.coordinate}
        mapContainerStyle={containerStyle}
        options={{ disableDefaultUI: true, styles: mapStyles }}
        onLoad={onMapLoad}
      >
        <MarkerF
          position={props.coordinate}
          icon={{
            url: "/pin.png",
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(-5, 8),
            anchor: new window.google.maps.Point(25, 25),
          }}
        />
      </GoogleMap>
    </Wrapper>
  );
};

export default (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <Map coordinate={props.coordinate} />;
  }
};
