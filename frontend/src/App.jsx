import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MatriksSoal from "./components/MatriksSoal";
import Background from "../src/assets/bg.jpg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Operator from "./pages/Operator";
import User from "./pages/User";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Operator />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
