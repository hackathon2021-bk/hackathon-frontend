import React from "react";
import {GoogleMap, SymbolPath, Marker, withGoogleMap,withScriptjs} from "react-google-maps";
import { key } from "constants/KeySetting";
import data from "data/data";
import { useDispatch, useSelector } from "react-redux";
import { MapActions } from "app-redux/map";
import map from "pages/map";
import { render } from "react-dom";


const BaseMapWithMarker = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center}
  >
    {props.markers.map((marker, index) => (
      <Marker 
        position={{ lat: marker.position.lat, lng: marker.position.lon}}
        onClick={() => props.onMarkerClick(marker)} 
        label={{
          text: marker.known === 1 ? marker.value : null, 
          color:"white", 
          fontSize:"15px",
          fontWeight:"bold"
        }}
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

export default function SimpleMap(){
  const dispatch = useDispatch();
  const stationId = useSelector((state) => state.map.stationId);

  const onSetStationId = (stationId) => {
    dispatch(MapActions.updateStationId(stationId));
  };
  
  let markers = data['data'].map(
    (dtPoint,index) => ({
      id: index,
      position: {lat: dtPoint.latitude, lon: dtPoint.longitude},
      value: dtPoint['known'] === 1 ? Math.round(dtPoint['data_daily']['H'][0]).toString() : null,
      known: dtPoint['known']
  }));

  // const renderMarkers = (data, map, maps) => {
  //   let markers = [];
    
  //   console.log(`${data['count']}`);

  //   for (const dtPoint of data['data']) {
  //     const dtPointVal = Math.round(dtPoint['data_daily']['H'][Math.floor(Math.random() * dtPoint['data_daily']['H'].length)]).toString();
  //     const known = dtPoint['known'];
      
  //     let marker = new maps.Marker({
  //       id: dtPoint['id'],
  //       position: { lat: dtPoint['latitude'], lng: dtPoint['longitude'] },
  //       map,
  //       label: 
  //         {
  //           text: known === 1 ? dtPointVal : null, 
  //           color:"white", 
  //           fontSize:"15px",
  //           fontWeight:"bold"
  //         }, 
  //       icon: {
  //         path: maps.SymbolPath.CIRCLE,
  //         scale: 30,
  //         fillColor: known === 1 ? "blue" : "red",
  //         fillOpacity: 2,
  //         strokeWeight: 2
  //       },
  //       onclick: handleMarkerClick(dtPoint['id'])
  //     });
  //     markers.push(marker);
  //   }
  //   return markers;
  //  };
   
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
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key, libraries: ["visualization"] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(data, map, maps)}
        yesIWantToUseGoogleMapApiInternals={true}
      /> */}
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

