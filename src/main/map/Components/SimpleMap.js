import React from "react";
import GoogleMapReact from 'google-map-react';
import { key } from "constants/KeySetting";
import data from "data/data";
import { useDispatch, useSelector } from "react-redux";
import { MapActions } from "app-redux/map";

export default function SimpleMap(){
  const dispath = useDispatch();
  const stationId = useSelector((state) => state.map.stationId);

  const onSetStationId = (stationId) => {
    dispath(MapActions.updateStationId(stationId));
  };

  const renderMarkers = (data, map, maps) => {
    let markers = [];
    
    console.log(`${data['count']}`);

    for (const dtPoint of data['data']) {
      const dtPointVal = Math.round(dtPoint['data_daily']['H'][Math.floor(Math.random() * dtPoint['data_daily']['H'].length)]).toString();
      const known = dtPoint['known'];
      
      let marker = new maps.Marker({
        position: { lat: dtPoint['latitude'], lng: dtPoint['longitude'] },
        map,
        label: 
          {
            text: known === 1 ? dtPointVal : null, 
            color:"white", 
            fontSize:"15px",
            fontWeight:"bold"
          }, 
        icon: {
          path: maps.SymbolPath.CIRCLE,
          scale: 30,
          fillColor: known === 1 ? "blue" : "red",
          fillOpacity: 2,
          strokeWeight: 2
        },
        onclick: handleMarkerClick(dtPoint['id'])
      });
      markers.push(marker);
    }
    return markers;
   };

  const defaultProps = {
    center: {lat: 21.153536, lng: 105.5096681},
    zoom: 10
  };

  const handleMarkerClick = (stationId) => {
    onSetStationId(stationId);
    console.log('object :>> ', stationId);
  } 

  return (
    <div className="m-4" style={{ height: "600px" }} >
      <GoogleMapReact
        bootstrapURLKeys={{ key, libraries: ["visualization"] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(data, map, maps)}
        yesIWantToUseGoogleMapApiInternals={true}
      />
    </div>
  );
}