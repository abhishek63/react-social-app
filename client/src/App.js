import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainRouter from "./MainRouter";
import NavBar from "./components/core/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
