import data from "data/data";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { InitActions } from "../../app-redux/init";

export default function HomePage(props) {
  const dispath = useDispatch();
  
  useEffect(() => {
    let markers = data['data'].map(
      (dtPoint,index) => ({
        id: index,
        position: {lat: dtPoint.latitude, lon: dtPoint.longitude},
        name: dtPoint['name']
    }));
    
    dispath(InitActions.setStations(markers));
  });
  return <div>okok</div>;
}
