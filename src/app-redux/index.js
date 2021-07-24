import { createStore } from "redux-dynamic-modules";
import { getThunkExtension } from "redux-dynamic-modules-thunk";

import { getSettingsModule } from "app-redux/settings";
import { getAuthModule } from "app-redux/auth";
import { getMapModule } from "app-redux/map";
import { getInitModule } from "app-redux/init";

const store = createStore(
  {
    extensions: [getThunkExtension()],
  },
  getInitModule(),
  getSettingsModule(),
  getAuthModule(),
  getMapModule(),
);

export default store;