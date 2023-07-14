import React, { ChangeEvent, useState } from "react";
import "../styles/app.css";
import Input from "./Input/Input";
import Slider from "./Slider/Slider";

function App() {
  const [variables, setVariables] = useState({
    width: "",
    height: "",
    size: 1,
    density: 25,
  });

  // const onCreate = () => {
  //   parent.postMessage(
  //     {
  //       pluginMessage: {
  //         type: "create-shapes",
  //         width: +variables.width,
  //         height: +variables.height,
  //         size: +variables.size,
  //         scale: +variables.distribution,
  //       },
  //     },
  //     "*"
  //   );
  // };

  const handleVariableChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVariables((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDensityChange = (value: number) => {
    setVariables((prev) => ({
      ...prev,
      density: value,
    }));
  }

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
        <div className="point-selector-wrapper"></div>
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
        <Slider value={variables.density} name="density" onChange={handleDensityChange}/>
      </div>
      <button className="prm-btn">Insert Noise</button>
    </div>
  );
}

export default App;
