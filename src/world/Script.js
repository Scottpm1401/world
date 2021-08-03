import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/style.css";

import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import Nation from "./Pages/Nation";

function Script() {
  const [theme, setTheme] = useState("light");

  const handleTheme = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      setTheme("light");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      setTheme("dark");
    }
  };

  useEffect(() => {
    document.body.classList.add("light");
  }, []);

  return (
    <Router>
      <Navbar callback={handleTheme} Theme={theme} />
      <Switch>
        <Route exact path="/">
          <Home Theme={theme} />
        </Route>
        <Route path="/nation/:name" children={<Nation Theme={theme} />}></Route>
      </Switch>
    </Router>
  );
}

export default Script;
