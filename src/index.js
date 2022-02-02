import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { persistStore } from "redux-persist";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";

import store from "./redux/store";

/* eslint-disable import/prefer-default-export */
export const persistor = persistStore(store);

ReactDOM.render(
  <App persistor={persistor} store={store} />,
  document.getElementById("root")
);
