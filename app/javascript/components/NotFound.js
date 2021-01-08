import React from "react";
import { Link } from "react-router-dom";
import Samurai from "images/samurai.gif";

const NotFound = () => {
  return (
    <div className="container">
      <div className="row">
        <h1 className="error-title">404: Page Not Found</h1>
        <img src={Samurai} id="samurai" />
      </div>
      <div>
        <h1 className="error-title">BEWARE OF SAMURAI! </h1>
      </div>
      <Link to="/">
        <button id="go-home-btn">GO BACK TO SAFETY</button>
      </Link>
    </div>
  );
};

export default NotFound;
