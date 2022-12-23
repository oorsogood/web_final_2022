// yarn add @react-google-maps/api
// yarn add react-geocode
// yarn add use-places-autocomplete
// yarn add @reach/combobox
// yarn add styled-components
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

Geocode.setApiKey("AIzaSyAHF2g9DJCIVmb-JwS0xL4teZiCrLXM6I8");
const libraries = ["places"];

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const PlacesContainer = styled.div`
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 10;
	width: 300px;
`;

const containerStyle = {
  width: '600px',
  height: '600px'
};

const PlacesAutocomplete = ({ setSelected, setSearchMarkers, panTo }) => {
	const { setAddress, setLatitude, setLongitude } = useMap();
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions
	} = usePlacesAutocomplete();
	const [isSearching, setIsSearching] = useState(false);
	const dummyRef = useRef();

	const handleSelect = async (address) => {
		setValue(address, false);
		clearSuggestions();

		const results = await getGeocode({ address });
		const { lat, lng } = getLatLng(results[0]);
		console.log({ lat, lng });
		setSelected({ lat, lng });
		setSearchMarkers([]);
		panTo({ lat, lng });
		setLatitude(lat);
		setLongitude(lng);
		Geocode.fromLatLng(lat, lng).then(
			(response) => {
				const address = response.results[0].formatted_address;
				setAddress(address);
				console.log(address);
			},
			(error) => {
				console.error(error);
			}
		);
	}

	const handleSearch = (query) => {
		var request = {
			// location: new window.google.maps.LatLng(25.016259, 121.533508),
			// radius: '1000',
			// keyword: query
			query: query,
			fields: ['name', 'geometry']
		};

		var map = new window.google.maps.Map(dummyRef.current);
		var service = new window.google.maps.places.PlacesService(map);

		service.findPlaceFromQuery(request, (results, status) => {
			if(status === window.google.maps.places.PlacesServiceStatus.OK) {
				let markerArray = [];
				for (var i = 0; i < results.length; i++) {
					console.log(results[i]);
					markerArray.push({ lat: results[i].geometry.location.lat(), lng: results[i].geometry.location.lng() });
				}
				setSearchMarkers(markerArray);
			}
			else{
				alert("No results found!");
			}
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
						if(e.key === "Enter"){
							console.log("Search fired!", value);
							handleSearch(value);
							setIsSearching(false);
						}
					}}
				/>
				<ComboboxPopover style={{ background: "white", fontSize: "13px" }}>
					<ComboboxList>
						{status === "OK" && isSearching && 
							data.map(({ place_id, description }) => (
								<ComboboxOption key={place_id} value={description} />
							))}
					</ComboboxList>
				</ComboboxPopover>
			</Combobox>
		</>
	)
}

const Map = () => {
	const { setAddress, setLatitude, setLongitude } = useMap();
	const center = useMemo(() => ({ lat: 25.016259, lng: 121.533508 }), []);
	const [selected, setSelected] = useState(null);
	const [searchMarkers, setSearchMarkers] = useState([]);
	const mapRef = useRef();

	useEffect(() => {
		if(searchMarkers.length !== 0){
			mapRef.current.panTo({ lat: searchMarkers[0].lat, lng: searchMarkers[0].lng });
			mapRef.current.setZoom(17);
			setSelected(searchMarkers[0]);
			setLatitude(searchMarkers[0].lat);
			setLongitude(searchMarkers[0].lng);
			Geocode.fromLatLng(searchMarkers[0].lat, searchMarkers[0].lng).then(
				(response) => {
					const address = response.results[0].formatted_address;
					setAddress(address);
					console.log(address);
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
		console.log(coordinate);
		setSelected(coordinate);
		setSearchMarkers([]);
		setLatitude(coordinate.lat);
		setLongitude(coordinate.lng);
		Geocode.fromLatLng(coordinate.lat, coordinate.lng).then(
			(response) => {
				const address = response.results[0].formatted_address;
				setAddress(address);
				console.log(address);
			},
			(error) => {
				console.error(error);
			}
		);
	};

	return (
		<Wrapper>
			<div>
				<PlacesAutocomplete setSelected={setSelected} setSearchMarkers={setSearchMarkers} panTo={panTo} />
			</div>
			<GoogleMap
				zoom={15}
				center={center}
				mapContainerStyle={containerStyle}
				options={{ disableDefaultUI: true }}
				onClick={handleClick}
				onLoad={onMapLoad}
			>
				{selected && <MarkerF position={selected} onClick={() => {
					setSelected(false);
					setLatitude(null);
					setLongitude(null);
				}}/>}
				{searchMarkers.map((marker, i) => {
					console.log("Marker should set");
					return <MarkerF position={{ lat: marker.lat, lng: marker.lng }} key={i} />
				})}
				{/* {markerClicked &&
				<InfoWindow position={selected} onCloseClick={() => setMarkerClicked(false)}>
					<div>
						<p>lat: {selected.lat.toFixed(2)}, lng: {selected.lng.toFixed(2)}</p>
					</div>
				</InfoWindow>} */}
			</GoogleMap>
		</Wrapper>
	)
}

export default () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: "AIzaSyAHF2g9DJCIVmb-JwS0xL4teZiCrLXM6I8",
		libraries
	});

	if(!isLoaded){
		return <div>Loading...</div>;
	} else{
		return <Map />;
	}
}