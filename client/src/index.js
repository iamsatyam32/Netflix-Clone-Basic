import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./authContext/AuthContext";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { AuthContextProvider } from "./authContext/AuthContext";

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <App />
//     </AuthContextProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
