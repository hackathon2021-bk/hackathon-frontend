import { useSelector } from "react-redux";
import data from "data/data";


export default function HomePage(props) {
  const stationId = useSelector((state) => state.init.stationId);
  const predictData = data['data'][stationId]['data_predict'];

  return (
    <div></div>
  );
}

