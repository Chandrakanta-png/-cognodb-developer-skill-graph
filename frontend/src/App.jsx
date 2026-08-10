import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Developers from "./pages/Developers";
import DeveloperDetails from "./pages/DeveloperDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/developers"
          element={<Developers />}
        />

        <Route
          path="/developer/:id"
          element={<DeveloperDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;