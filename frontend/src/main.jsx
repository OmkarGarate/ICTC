import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./app/store";
import { fetchCurrentUser } from "./redux/auth/authSlice";

import "./index.css";

// Rehydrate auth state from the httpOnly cookie before rendering.
// This is what sets initialized=true and prevents ProtectedRoute
// from incorrectly redirecting on a page refresh.
store.dispatch(fetchCurrentUser());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
