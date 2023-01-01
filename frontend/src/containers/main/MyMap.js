import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";
import Geocode from "react-geocode";
import styled from 'styled-components';
import { useMap } from '../../hooks/useMap';
import Post from "./Post";
import axios from "../../api";

Geocode.setApiKey("AIzaSyAHF2g9DJCIVmb-JwS0xL4teZiCrLXM6I8");
const libraries = ["places"];

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

// const PlacesContainer = styled.div`
// 	position: absolute;
// 	top: 10px;
// 	left: 50%;
// 	transform: translateX(-50%);
// 	z-index: 10;
// 	width: 300px;
// `;

const containerStyle = {
    width: '600px',
    height: '600px'
};

const Map = () => {
    // const { setAddress, setLocation, setLatitude, setLongitude } = useMap();
    const center = useMemo(() => ({ lat: 0, lng: 0 }), []);
    // const [selected, setSelected] = useState(null);
    // const [searchMarkers, setSearchMarkers] = useState([]);
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

    // const panTo = useCallback(({ lat, lng }) => {
    //     mapRef.current.panTo({ lat, lng });
    //     mapRef.current.setZoom(17);
    // }, []);

    // const handleClick = (e) => {
    //     // console.log("place id", e.placeId);

    //     const coordinate = {
    //         lat: e.latLng.lat(),
    //         lng: e.latLng.lng()
    //     };
    //     // console.log(coordinate);
    //     setSelected(coordinate);
    //     setSearchMarkers([]);
    //     setLatitude(coordinate.lat);
    //     setLongitude(coordinate.lng);
    //     Geocode.fromLatLng(coordinate.lat, coordinate.lng).then(
    //         (response) => {
    //             const address = response.results[0].formatted_address;
    //             setAddress(address);
    //             setLocation(address);
    //             // console.log(address);
    //         },
    //         (error) => {
    //             console.error(error);
    //         }
    //     );
    //     if(e.placeId !== undefined){
    //         var map = new window.google.maps.Map(dummyRef.current);
    //         var service = new window.google.maps.places.PlacesService(map);
    //         var request = {
    //             placeId: e.placeId
    //         };
    //         service.getDetails(request, function (place, status) {
    //             if (status == window.google.maps.places.PlacesServiceStatus.OK) {
    //                 // console.log("place name", place.name)
    //                 setLocation(place.name);
    //             }
    //         });
    //     };
    // };

    return (
        <Wrapper>
            <div ref={dummyRef} />
            <GoogleMap
                zoom={1.2}
                center={center}
                mapContainerStyle={containerStyle}
                options={{ disableDefaultUI: true }}
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
                {/* {selected && <MarkerF position={selected} onClick={() => {
                    setSelected(false);
                    setLatitude(null);
                    setLongitude(null);
                }} />}
                {searchMarkers.map((marker, i) => {
                    // console.log("Marker should set");
                    const lat = parseFloat(marker.geometry.location.lat());
                    const lng = parseFloat(marker.geometry.location.lng());
                    return <MarkerF position={{ 
                        lat,
                        lng
                    }} key={i} />
                })} */}
                {/* {markerClicked &&
				<InfoWindow position={selected} onCloseClick={() => setMarkerClicked(false)}>
					<div>
						<p>lat: {selected.lat.toFixed(2)}, lng: {selected.lng.toFixed(2)}</p>
					</div>
				</InfoWindow>} */}
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