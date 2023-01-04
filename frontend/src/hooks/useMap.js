import { createContext, useContext, useState } from "react";

const MapContext = createContext({
  location: "",
  address: "",
  latitude: null,
  longitude: null,
});

const MapProvider = (props) => {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  return (
    <MapContext.Provider
      value={{
        location,
        setLocation,
        address,
        setAddress,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
      }}
      {...props}
    />
  );
};

function useMap() {
  return useContext(MapContext);
}

export { MapProvider, useMap };
