import React from "react";
import ReactDOM from "react-dom";
import ContactUS from "./ContactUS";
import "./Index.css";

function App() {
  return (
    <>
      <ContactUS />
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
