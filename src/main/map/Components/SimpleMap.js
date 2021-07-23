import React from "react";
import {GoogleMap, InfoWindow, Marker, withGoogleMap,withScriptjs} from "react-google-maps";
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
      />
    ))}
  </GoogleMap>
));


// withScriptjs(withGoogleMap( props => (
//   <GoogleMap
//     googleMapURL={props.googleMapURL}
//     loadingElement={<div style={{ height: `100%` }} />}
//     containerElement={<div style={{ height: `400px` }} />}
//     mapElement={<div style={{ height: `100%` }} />}
//     center={props.center}
//     defaultZoom={props.zoom}
//     // onGoogleApiLoaded={({ map, maps }) => renderMarkers(data, map, maps)}
//     // yesIWantToUseGoogleMapApiInternals={true}
//   />
    /* {props.markers.map((marker, index) => (
      <Marker
        position={marker.position} 
        onClick={() => props.onClick(marker)}
      />
//     ))} */
//   // </GoogleMap>
// )));

export default function SimpleMap(){
  const dispath = useDispatch();
  const stationId = useSelector((state) => state.map.stationId);

  const onSetStationId = (stationId) => {
    dispath(MapActions.updateStationId(stationId));
  };
  
  const markers = data['data'].map(
    (dtPoint,index) => ({
      id: index,
      position: {lat: dtPoint.latitude, lon: dtPoint.longitude},
      label: {
        text: dtPoint['known'] === 1 ? Math.round(dtPoint['data_daily']['H'][Math.floor(Math.random() * dtPoint['data_daily']['H'].length)]).toString() : null, 
        color:"white", 
        fontSize:"15px",
        fontWeight:"bold"
      }, 
      icon: {
        // path: maps.SymbolPath.CIRCLE,
        scale: 30,
        fillColor: dtPoint['known'] === 1 ? "blue" : "red",
        fillOpacity: 2,
        strokeWeight: 2
      },
  }));
  console.log('markers :>> ', markers);

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
    console.log('object :>> ', targetMarker.id);
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
        // googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
        googleMapURL={props.googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

