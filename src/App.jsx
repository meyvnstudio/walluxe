import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import Homepage from "./pages/Home";
import Watchpage from "./pages/Watch";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="watch" element={<Watchpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
