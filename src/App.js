import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Routes from "./routes";

const App = () => (
  <>
    <ToastContainer position="top-right" />
    <Routes />
  </>
);

export default App;
