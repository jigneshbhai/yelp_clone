import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import UpdatePage from "./routes/UpdatePage";
const App = () => {
  return (
    <RestaurantsContextProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
