import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { SessionProvider } from "@inrupt/solid-ui-react";
import {Helmet} from "react-helmet";


ReactDOM.render(
    <SessionProvider sessionId="radarin_en2b">
      <React.StrictMode>
      <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Helmet>
        <App/>
      </React.StrictMode>
    </SessionProvider>
    ,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
