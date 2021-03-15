import { Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Contact } from "./Contact";
import { Dashboard } from "./Dashboard";
import React from "react";

export function RootRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>{" "}
      <Route path="/dashboard">
        <Dashboard />
      </Route>{" "}
      <Route path="/contact">
        <Contact />
      </Route>{" "}
    </Switch>
  );
}
