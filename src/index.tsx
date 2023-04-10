import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import reportWebVitals from "./utils/reportWebVitals";

// require("dotenv").config();  ====> Suuuuper broken. Some issue with serverless and webpack disagreeing about dependencies.
// This thread has the best info, but none of the workarounds worked. https://github.com/webpack-contrib/css-loader/issues/447

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
/* Strict mode causes useEffect hook to fire twice 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
