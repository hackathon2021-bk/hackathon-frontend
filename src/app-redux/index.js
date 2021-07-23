import { createStore } from "redux-dynamic-modules";
import { getThunkExtension } from "redux-dynamic-modules-thunk";

import { getSettingsModule } from "app-redux/settings";
import { getAuthModule } from "app-redux/auth";
import { getMapModule} from "app-redux/map";

const store = createStore(
  {
    extensions: [getThunkExtension()],
  },
  getSettingsModule(),
  getAuthModule(),
  getMapModule(),
);

export default store;