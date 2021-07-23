import React from "react";
import {GoogleMap, SymbolPath, Marker, withGoogleMap,withScriptjs} from "react-google-maps";
import { key } from "constants/KeySetting";
import data from "data/data";
import { useDispatch, useSelector } from "react-redux";

const BaseMapWithMarker = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    center={props.center}
  >
    <Marker 
        position={{ lat: props.marker.position.lat, lng: props.marker.position.lon}}
        label={{
            text:  props.marker.value, 
            color:"white", 
            fontSize:"15px",
            fontWeight:"bold"
        }}
        icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 30,
            fillColor: "blue",
            fillOpacity: 2,
            strokeWeight: 2,
        }}
    />
  </GoogleMap>
));

export default function SimpleMap(){
  const dispatch = useDispatch();
  const stationId = useSelector((state) => state.map.stationId);

  const getStationData = (data, stationId) =>{
    console.log('stationId :>> ', stationId);
    let dtPoint = data['data'][stationId];
    console.log('dtPoint :>> ', dtPoint);
    return {
        'id': stationId,
        'known': dtPoint['known'],
        'name': dtPoint['name'],
        'latitude': dtPoint['latitude'],
        'longitude': dtPoint['longitude'],
        'temperature': Math.round(dtPoint['data_daily']['avg_temp'][Math.floor(Math.random() * dtPoint['data_daily']['avg_temp'].length)]).toString(),
        'evaporation': Math.round(dtPoint['data_daily']['evaporation'][Math.floor(Math.random() * dtPoint['data_daily']['evaporation'].length)]).toString(),
        'water_level': Math.round(dtPoint['data_daily']['H'][0]).toString(),
        'discharge': Math.round(dtPoint['data_daily']['Q'][Math.floor(Math.random() * dtPoint['data_daily']['Q'].length)]).toString(),
        'rainfall': Math.round(dtPoint['data_daily']['rainfall'][Math.floor(Math.random() * dtPoint['data_daily']['rainfall'].length)]).toString(),
        'humidity': Math.round(dtPoint['data_daily']['humidity'][Math.floor(Math.random() * dtPoint['data_daily']['humidity'].length)]).toString(),
    }
  }

  const curStationData = getStationData(data, stationId);

  console.log('curStationData :>> ', curStationData);

  let marker = {
    id: curStationData.id,
    position: {lat: curStationData.latitude, lon: curStationData.longitude},
    value: curStationData['water_level'],
  };
   
  const props = {
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}`,
    center: {lat: curStationData.latitude, lng: curStationData.longitude},
    zoom: 10,
    marker: marker
  };

  return (
    <div className="m-4" style={{ height: "300px" }} >
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key, libraries: ["visualization"] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(data, map, maps)}
        yesIWantToUseGoogleMapApiInternals={true}
      /> */}
      <BaseMapWithMarker
        {...props}
        // onMarkerClick={handleMarkerClick}
        googleMapURL={props.googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `300px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

