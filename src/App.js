import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes/index";
import "./App.css";

class App extends Component {
  render() {
    return <div> {this.showContent(routes)}</div>;
  }

  showContent = routes => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

export default App;
