import React from "react";
import { Link } from "react-router-dom";
import Brightness2OutlinedIcon from "@material-ui/icons/Brightness2Outlined";
import Brightness2Icon from "@material-ui/icons/Brightness2";

function Navbar(props) {
  return (
    <nav className="nav_bar">
      <div className="nav_crl container">
        <Link className="logo" to="/">
          Where in the world
        </Link>
        <button className="theme_crl" onClick={() => props.callback()}>
          {props.Theme === "dark" ? (
            <>
              <Brightness2OutlinedIcon />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Brightness2Icon />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
