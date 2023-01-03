import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng
} from "use-places-autocomplete";
import Geocode from "react-geocode";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption
} from "@reach/combobox";
import styled from 'styled-components';
import { useMap } from '../hooks/useMap';
import mapStyles from "./MapStyles";

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
	width: '550px',
	height: '475px'
};

const PlacesAutocomplete = ({ setSelected, setSearchMarkers, panTo, setSearchError }) => {
    const { setAddress, setLocation, setLatitude, setLongitude } = useMap();
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete();
    const [isSearching, setIsSearching] = useState(false);
    const dummyRef = useRef();

    const handleSelect = async (location) => {
        setLocation(location);
        setValue(location, false);
        clearSuggestions();
				setIsSearching(false);
				setSearchError(false);

        const results = await getGeocode({ address: location });
        const { lat, lng } = getLatLng(results[0]);
        setSelected({ lat, lng });
        setSearchMarkers([]);
        panTo({ lat, lng });
        setLatitude(lat);
        setLongitude(lng);
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                setAddress(address);
            },
            (error) => {
                console.error(error);
            }
        );

    }

    const handleSearch = (query) => {
        var request = {
            query: query,
            fields: ['name', 'geometry']
        };

        var map = new window.google.maps.Map(dummyRef.current);
        var service = new window.google.maps.places.PlacesService(map);

        service.findPlaceFromQuery(request, (results, status) => {
            // if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // let markerArray = [];
            // for (var i = 0; results !== null && i < results.length; i++) {
            //     // console.log(results[i]);
            //     // markerArray.push({ lat: results[i].geometry.location.lat(), lng: results[i].geometry.location.lng() });
            //     markerArray.push(results[i]);
            // };
            const markerArray = results === null ? [] : [results[0]];
						const error = results === null ? true : false;
            setSearchMarkers(markerArray);
						setAddress("");
						setSearchError(error);
            // }
            // if(results === null){
            //   alert("No results found!");
            // };
            // else {
            //     alert("No results found!");
            // }
        });
    };

    return (
        <>
            <div ref={dummyRef}></div>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setIsSearching(true);
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    style={{ width: "400px", padding: "0.5rem" }}
                    placeholder="Search an address"
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleSearch(value);
                            setIsSearching(false);
                        }
                    }}
                />
                <ComboboxPopover style={{ background: "white", fontSize: "14px" }}>
										{status === "OK" && isSearching && 
											<ComboboxList>
												{data.map(({ place_id, description }) => (
													<ComboboxOption key={place_id} value={description} style={{cursor: "pointer"}} />
												))}
											</ComboboxList>
										}
                </ComboboxPopover>
            </Combobox>
        </>
    )
}

const Map = () => {
    const { setAddress, setLocation, setLatitude, setLongitude } = useMap();
    const center = useMemo(() => ({ lat: 25.016259, lng: 121.533508 }), []);
    const [selected, setSelected] = useState(null);
    const [searchMarkers, setSearchMarkers] = useState([]);
    const [searchError, setSearchError] = useState(false);
    const mapRef = useRef();
    const dummyRef = useRef();

    useEffect(() => {
        if (searchMarkers.length !== 0) {
            setLocation(searchMarkers[0].name);
            const coordinate = {
                lat: parseFloat(searchMarkers[0].geometry.location.lat()),
                lng: parseFloat(searchMarkers[0].geometry.location.lng())
            };
            mapRef.current.panTo({ lat: coordinate.lat, lng: coordinate.lng });
            mapRef.current.setZoom(17);
            setSelected(false);
            setLatitude(coordinate.lat);
            setLongitude(coordinate.lng);
            Geocode.fromLatLng(coordinate.lat, coordinate.lng).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    setAddress(address);
                },
                (error) => {
                    console.error(error);
                }
            );
        };
    }, [searchMarkers]);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(17);
    }, []);

    const handleClick = (e) => {
        const coordinate = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        setSelected(coordinate);
        setSearchMarkers([]);
        setLatitude(coordinate.lat);
        setLongitude(coordinate.lng);
				setSearchError(false);
        Geocode.fromLatLng(coordinate.lat, coordinate.lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                setAddress(address);
                setLocation("");
            },
            (error) => {
                console.error(error);
            }
        );
        if(e.placeId !== undefined){
            e.stop();
            var map = new window.google.maps.Map(dummyRef.current);
            var service = new window.google.maps.places.PlacesService(map);
            var request = {
                placeId: e.placeId
            };
            service.getDetails(request, function (place, status) {
                if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                    setLocation(place.name);
                }
            });
        };
    };

    return (
        <Wrapper>
            <div ref={dummyRef} />
						<div>
							<div style={{
								height: "50px", 
								width: "100px", 
								position: "absolute",
								left: "12.5%",
								transform: "translate(0%, 20%)",
								zIndex: 1
							}}>
									<PlacesAutocomplete
										setSelected={setSelected}
										setSearchMarkers={setSearchMarkers}
										panTo={panTo}
										setSearchError={setSearchError}
									/>
							</div>
							<GoogleMap
									zoom={15}
									center={center}
									mapContainerStyle={containerStyle}
									options={{ disableDefaultUI: true, styles: mapStyles }}
									onClick={handleClick}
									onLoad={onMapLoad}
							>
									{selected && <MarkerF position={selected} onClick={() => {
											setSelected(false);
											setAddress("");
											setLatitude(null);
											setLongitude(null);
									}} icon={{
											url: "/pin.png",
											scaledSize: new window.google.maps.Size(50, 50),
											origin: new window.google.maps.Point(-5, 8),
											anchor: new window.google.maps.Point(25, 25)
										}} />}
									{searchMarkers.map((marker, i) => {
											// console.log("Marker should set");
											const lat = parseFloat(marker.geometry.location.lat());
											const lng = parseFloat(marker.geometry.location.lng());
											return <MarkerF position={{ 
													lat,
													lng
											}} key={i} icon={{
													url: "/pin.png",
													scaledSize: new window.google.maps.Size(50, 50),
													origin: new window.google.maps.Point(-5, 8),
													anchor: new window.google.maps.Point(25, 25)
											}} onClick={() => {
													setSearchMarkers([]);
													setAddress("");
													setLatitude(null);
													setLongitude(null);
											}} />
									})}
							</GoogleMap>
							{
								searchError ? 
								<center style={{ margin: "0"}}>
									<p style={{ color: "red" }}>No results found! Please search or pin another place.</p>
								</center>
								: <></>
            	}
						</div>
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