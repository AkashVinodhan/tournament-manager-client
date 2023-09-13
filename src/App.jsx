import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewTournament from "./pages/NewTournament";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/create" element={<NewTournament />} />
      <Route path="/tournaments/:id" element={<NewTournament />} />
    </Routes>
  );
}

export default App;
