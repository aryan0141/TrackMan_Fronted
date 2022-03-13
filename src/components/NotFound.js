import React, { Fragment } from "react";
import Navbar from "./Navbar";

function NotFound() {
  return (
    <Fragment>
      <Navbar />
      <div
        id="wrapper"
        style={{
          maxWidth: 500,
          margin: "auto",
          textAlign: "center",
        }}
      >
        <img src="https://i.imgur.com/qIufhof.png" width={400} height={300} />
        <div id="info">
          <h3>This page could not be found</h3>
        </div>
      </div>
    </Fragment>
  );
}

export default NotFound;
