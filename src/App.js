import React from "react";
import Events from "./Events";

function App() {
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
      </header>
      <Events />
    </div>
  );
}

export default App;
