import React from "react";
import { GoogleMap, SymbolPath, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { key } from "constants/KeySetting";
import { useDispatch, useSelector } from "react-redux";
import { MapActions } from "app-redux/map";
import map from "pages/map/map";

const BaseMapWithMarker = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    center={props.center}
  >
    {props.markers.map((marker) => (
      <Marker
        position={{ lat: marker.position.lat, lng: marker.position.lon }}
        onClick={() => props.onMarkerClick(marker)}
        // label={{
        //   text: marker.known === 1 ? marker.value : null,
        //   color: "white",
        //   fontSize: "15px",
        //   fontWeight: "bold"
        // }}
        map={{ map }}
        icon={{
          // path: google.maps.SymbolPath.CIRCLE,
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
          scale: 1,
          fillColor: marker.known === 1 ? "#6092e0" : "#f76565",
          fillOpacity: 2,
          strokeWeight: 1,
          strokeColor: marker.known === 1 ? "#1a6ded" : "#f22929",
        }}
      />
    ))}
  </GoogleMap>
));

export default function SimpleMap(defaultProps) {
  const dispatch = useDispatch();
  const stationId = defaultProps.props.stationId;
  const data = defaultProps.props.data;

  const onSetStationId = (stationId) => {
    dispatch(MapActions.updateStationId(stationId));
  };

  let markers = data.map(
    (dtPoint) => ({
      id: dtPoint.id,
      position: { lat: dtPoint.latitude, lon: dtPoint.longitude },
      value: dtPoint['known'] === 1 ? Math.round(dtPoint['data_daily']['H'][0]).toString() : null,
      known: dtPoint['known']
    }));

  console.log('station Data check update?:>> ', data);

  const props = {
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}`,
    center: { lat: 21.153536, lng: 105.5096681 },
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

