import React from "react";
import ReactDOM from "react-dom";

import "rsuite/dist/styles/rsuite-default.css";
import 'react-fetcher-hooks/dist/styles.css';
import "./index.scss";

import * as serviceWorker from "./serviceWorker";
import { AppWrapper } from "./AppWrapper";

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
