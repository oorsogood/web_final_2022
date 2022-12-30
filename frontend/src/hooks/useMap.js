import { createContext, useContext, useState } from 'react';

const MapContext = createContext({
    address: "",
    latitude: null,
    longitude: null
});

const MapProvider = (props) => {
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    return (
        <MapContext.Provider
            value={{
                address,
                setAddress,
                latitude,
                setLatitude,
                longitude,
                setLongitude
            }}
            {...props}
        />
    );
};

function useMap() {
    return useContext(MapContext);
}

export { MapProvider, useMap };
