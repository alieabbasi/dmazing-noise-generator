import React, { ChangeEvent, useState } from "react";
import "../styles/app.css";
import Input from "./Input/Input";
import Slider from "./Slider/Slider";
import PointSelector from "./PointSelector/PointSelector";
import {
  LinearDensityCreation,
  ReadialDensityCreation,
} from "../../typings/interfaces";

function App() {
  const [variables, setVariables] = useState({
    x: -1,
    y: -1,
    width: "50",
    height: "50",
    size: 1,
    density: 25,
  });

  const onInsert = () => {
    if (variables.x === -1) {
      createLinearNoise();
    } else {
      createRadialNoise();
    }
  };

  const createLinearNoise = () => {
    const data: LinearDensityCreation = {
      type: "linear-density",
      width: +variables.width,
      height: +variables.height,
      size: variables.size,
      density: (100 - variables.density) * 0.09 + 1,
    };
    parent.postMessage({ pluginMessage: data });
  };

  const createRadialNoise = () => {
    const data: ReadialDensityCreation = {
      type: "radial-density",
      width: +variables.width,
      height: +variables.height,
      size: variables.size,
      density: (100 - variables.density) * 0.25 + 1,
      x: (+variables.width / 19) * (variables.x + 1),
      y: (+variables.height / 19) * (variables.y + 1),
    };
    parent.postMessage({ pluginMessage: data });
  };

  const handleVariableChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVariables((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const densityChangeHandler = (value: number) => {
    setVariables((prev) => ({
      ...prev,
      density: value <= 100 ? value : prev.density,
    }));
  };

  const pointChangeHandler = (i: number, j: number) => {
    setVariables((prev) => ({ ...prev, x: i / 19, y: j / 19 }));
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === "create-rectangles") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div className="app">
      <div>
        <p className="opacity-60">Radial </p>
        <PointSelector onSelect={pointChangeHandler} />
      </div>
      <div>
        <p className="opacity-60">Noise Size</p>
        <div className="inputs">
          <Input
            value={variables.width}
            label="W"
            onChange={handleVariableChange}
            name="width"
          />
          <Input
            value={variables.height}
            label="H"
            onChange={handleVariableChange}
            name="height"
          />
        </div>
      </div>
      <div className="density-section">
        <p className="opacity-60">Density</p>
        <Slider
          value={variables.density}
          name="density"
          onChange={densityChangeHandler}
        />
      </div>
      <button className="prm-btn" onClick={onInsert}>
        Insert Noise
      </button>
    </div>
  );
}

export default App;
