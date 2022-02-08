import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./file/Create";
import DetailPage from "./file/details";
import Header from "./file/Header";
import Home from "./file/Home";

const App = () => {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/create" element={<Create />} />
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<DetailPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
