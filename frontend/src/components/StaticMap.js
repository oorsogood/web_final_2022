import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import styled from "styled-components";
import { propsToClassKey } from "@mui/styles";
import mapStyles from "./mapStyles";

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
  width: "450px",
  height: "450px",
};

const Map = (props) => {
  // console.log(props.coordinate);
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
    googleMapsApiKey: "AIzaSyAHF2g9DJCIVmb-JwS0xL4teZiCrLXM6I8",
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <Map coordinate={props.coordinate} />;
  }
};
