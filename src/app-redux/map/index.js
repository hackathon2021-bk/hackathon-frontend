import data from "data/data";

const SET_STATION_ID= "set_station_id";
const SET_SUBSCRIBED_STATION_ID = "set_updated_station_id";
const SET_STATION_DATA = "set_station_data"

const MapActions = {
  updateStationId(stationId) {
    return { type: SET_STATION_ID, payload: stationId };
  },
  updateSubscribedStationId(lstSubscribedStationId) {
    return { type: SET_SUBSCRIBED_STATION_ID, payload: lstSubscribedStationId}
  },
  updateStationData(stationData) {
    return { type: SET_STATION_DATA, payload: stationData}
  }
};

const initialState = {
    stationId:  1,
    lstSubscribedStationId: [1, 4, 5, 7],
    stationData: data['data']
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATION_ID:
      return { ...state, stationId: action.payload };
    case SET_SUBSCRIBED_STATION_ID:
      return { ...state, lstSubscribedStationId: action.payload};
    case SET_STATION_DATA:
      return {...state, stationData: action.payload};
    default:
      return state;
  }
}

function getMapModule() {
  return {
    id: "map",
    reducerMap: { map: reducer },
  };
}

export { MapActions, getMapModule };
