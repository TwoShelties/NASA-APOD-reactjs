import { logDOM } from "@testing-library/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  //   const navigate = useNavigate();

  return (
    <div className="navbar">
      <img src={require("../media/nasa-logo1.png")} id="navbar-logo" />
      <h1 id="page-title">Astronomy Picture of the Day</h1>
      <div className="navbar-links">
        <p>
          <Link to="/">APOD</Link>
        </p>
        <p>
          <Link to="/random">Random APOD</Link>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
