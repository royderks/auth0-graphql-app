import React from "react";
import { Switch, Route } from "react-router-dom";
import Events from "./Events";
import Event from "./Event";
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div style={{ fontFamily: "Helvetica" }}>
      <header
        style={{
          display: "inline-block",
          width: "100%",
          backgroundColor: "lightBlue",
          padding: "10 20px",
          textAlign: "center",
          borderRadius: "5px"
        }}
      >
        <h1 style={{ color: "white" }}>Events</h1>
        <button onClick={!isAuthenticated ? loginWithRedirect : logout}>
          {!isAuthenticated ? "Login" : "Logout"}
        </button>
      </header>

      <Switch>
        <Route path="/event/:id"><Event /></Route>
        <Route path="*">
          <Events />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
