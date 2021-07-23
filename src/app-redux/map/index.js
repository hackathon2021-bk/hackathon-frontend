const SET_STATION_ID= "set_station_id";
const SET_SUBSCRIBED_STATION_ID = "set_updated_station_id";

const MapActions = {
  updateStationId(stationId) {
    return { type: SET_STATION_ID, payload: stationId };
  },
  updateSubscribedStationId(lstSubscribedStationId) {
    return { type: SET_SUBSCRIBED_STATION_ID, payload: lstSubscribedStationId}
  }
};

const initialState = {
    stationId:  1,
    lstSubscribedStationId: [1, 4, 5, 7]
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATION_ID:
      return { ...state, stationId: action.payload };
    case SET_SUBSCRIBED_STATION_ID:
      return { ...state, lstSubscribedStationId: action.payload};
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
