import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import UserForm from "./Components/UserForm.js";
import UserList from "./Components/UserList.js";
import AddDistribution from "./Components/AddDistribution";
import { ListDistribution } from "./Components/ListDistribution";
import Headers from "./Components/Headers";

const client = new ApolloClient({
  uri: "http://box.phys.devorch.com:8092/graphql",
  headers: {
    // "Grass-Account-Id": 33088,
    // "Grass-Account-Type": "vendor",
    "Orchard-User-Id": "alw:75768",
  },
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div className="App">
          <Headers />
          <Switch>
            <Route exact path="/">
              <UserList />
            </Route>
            <Route path="/addemployee">
              <UserForm />
            </Route>
            <Route path="/addgraphql">
              <AddDistribution />
            </Route>
            <Route path="/listgraphql">
              <ListDistribution />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
