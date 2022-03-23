import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <App />
    <Footer />
  </BrowserRouter>,
  document.getElementById("root")
);
