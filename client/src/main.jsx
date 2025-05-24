import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider domain="dev-cjthkvbi2d02zo4n.us.auth0.com" clientId="9yWLLznfw5Q8vIiYJDx0iztMT9P9qPJl" authorizationParams={{
      redirect_uri: "https://animated-enigma-x5x759q5gpwxc57p-5173.app.github.dev"
    }}
    audience="https://animated-enigma-x5x759q5gpwxc57p-8000.app.github.dev"
    scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);