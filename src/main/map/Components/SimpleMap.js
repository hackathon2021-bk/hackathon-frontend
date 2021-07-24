import React from "react";
import {GoogleMap, SymbolPath, Marker, withGoogleMap,withScriptjs} from "react-google-maps";
import { key } from "constants/KeySetting";
import { useDispatch, useSelector } from "react-redux";
import { MapActions } from "app-redux/map";
import map from "pages/map";

const BaseMapWithMarker = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    center={props.center}
  >
    {props.markers.map((marker) => (
      <Marker 
        position={{ lat: marker.position.lat, lng: marker.position.lon}}
        onClick={() => props.onMarkerClick(marker)} 
        label={{
          text: marker.known === 1 ? marker.value : null, 
          color:"white", 
          fontSize:"15px",
          fontWeight:"bold"
        }}
        map={{map}}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 30,
          fillColor: marker.known === 1 ? "blue" : "red",
          fillOpacity: 2,
          strokeWeight: 2,
        }}
      />
    ))}
  </GoogleMap>
));

export default function SimpleMap(defaultProps){
  const dispatch = useDispatch();
  const data = defaultProps.props.data;

  const onSetStationId = (stationId) => {
    dispatch(MapActions.updateStationId(stationId));
  };
  
  let markers = data.map(
    (dtPoint) => ({
      id: dtPoint.id,
      position: {lat: dtPoint.latitude, lon: dtPoint.longitude},
      value: dtPoint['known'] === 1 ? Math.round(dtPoint['data_daily']['H'][0]).toString() : null,
      known: dtPoint['known']
  }));

  // console.log('station Data check update?:>> ', data);
   
  const props = {
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}`,
    center: {lat: 21.153536, lng: 105.5096681},
    zoom: 10,
    markers: markers
  };

  const handleMarkerClick = (targetMarker) => {
    onSetStationId(targetMarker.id);
  } 

  return (
    <div className="m-4" style={{ height: "600px" }} >
      <BaseMapWithMarker
        {...props}
        onMarkerClick={handleMarkerClick}
        googleMapURL={props.googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

