import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import { Routes } from "./Routes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
