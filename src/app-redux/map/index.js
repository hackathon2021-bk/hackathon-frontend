const SET_STATION_ID= "set_station_id";

const MapActions = {
  updateStationId(stationId) {
    return { type: SET_STATION_ID, payload: stationId };
  },
};

const initialState = {
    stationId:  1,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATION_ID:
      return { ...state, stationId: action.payload };
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
