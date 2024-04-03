import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MatriksSoal from "./components/MatriksSoal";
import Background from "../src/assets/bg.jpg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <img src={Background} alt="" className="w-screen h-screen absolute -z-20" />
      <div className="p-10 h-screen">
        <div className="flex gap-5">
          <MatriksSoal color={"primary"} />
          <MatriksSoal color={"secondary"} />
          <MatriksSoal color={"warning"} />
          <MatriksSoal color={"success"} />
          <MatriksSoal color={"danger"} />
        </div>
      </div>
    </>
  );
}

export default App;
