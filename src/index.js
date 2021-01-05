import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Dashboard from "./Dashboard";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter,Switch, Route, Router } from "react-router-dom";
import Debug from "./Debug";
import { createMemoryHistory } from 'history'


const history = createMemoryHistory()

ReactDOM.render(

    // <Router history={history}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/debug" component={Debug} exact />
      </Switch>
    </BrowserRouter>,
  // </Router>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// function Debug() {
//     return <h2>Home</h2>;
// }
