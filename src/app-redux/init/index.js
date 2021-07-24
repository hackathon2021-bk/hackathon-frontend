
const SET_STATIONS = "set_stations";
const SET_CURRENT_STATION_ID = "set_current_station_id";
const SET_EMAIL = "set_alert_email";

const InitActions = {
  setStations(stationsList) {
    return { type: SET_STATIONS, payload: stationsList };
  },
  setStationId(stationId) {
    return { type: SET_CURRENT_STATION_ID, payload: stationId };
  },
  setEmail(email) {
    return { type: SET_EMAIL, payload: email };
  }
};

const initialState = {
    stationsList: [],
    stationId:  1,   
    email: ''
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATIONS:
      return { ...state, stationsList: action.payload };
    case SET_CURRENT_STATION_ID:
      return { ...state, stationId: action.payload };
    case SET_EMAIL:
        return { ...state, email: action.payload };
    default:
      return state;
  }
}

function getInitModule() {
  return {
    id: "init",
    reducerMap: { init: reducer },
  };
}

export { InitActions, getInitModule };
